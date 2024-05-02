package com.zerobase.hoops.security;

import com.zerobase.hoops.users.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenProvider {

  private static final long TOKEN_EXPIRE_TIME = 1000 * 60 * 60;
  private static final long BLACK_TOKEN_EXPIRE_TIME = 1000 * 60 * 2;
  private final UserService userService;

  @Getter
  private final Set<String> logOut =
      new ConcurrentSkipListSet<>();

  @Value("${spring.jwt.secret}")
  private String secretKey;

  public String generateToken(String email) {

    Claims claims = Jwts.claims().setSubject(email);

    var now = new Date();
    var expireDate = new Date(now.getTime() + TOKEN_EXPIRE_TIME);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(expireDate)
        .signWith(SignatureAlgorithm.HS512, this.secretKey)
        .compact();
  }

  public Claims parseClaims(String token) {
    try {
      return Jwts.parser().setSigningKey(this.secretKey)
          .parseClaimsJws(token).getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

  public String getUsername(String token) {
    return this.parseClaims(token).getSubject();
  }

  public boolean validateToken(String token) {
    if (!StringUtils.hasText(token)) {
      return false;
    }
    var claims = this.parseClaims(token);
    return !claims.getExpiration().before(new Date());
  }

  public Authentication getAuthentication(String jwt) {
    UserDetails userDetails =
        this.userService.loadUserByUsername(
            this.getUsername(jwt));
    return new UsernamePasswordAuthenticationToken(
        userDetails,
        "",
        userDetails.getAuthorities());
  }

  public boolean isLogOut(String token) {
    return this.logOut.contains(token);
  }

  public void addToLogOutList(String token) {
    this.logOut.add(token);
  }

}