package com.zerobase.hoops.users.auth.filter;

import com.zerobase.hoops.users.auth.token.JwtAuthenticationToken;
import com.zerobase.hoops.users.exception.CustomException;
import com.zerobase.hoops.users.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final AuthenticationManager authenticationManager;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = "";
    try {
      token = getToken(request);
      if (StringUtils.hasText(token)) {
        getAuthentication(token);
      }
      filterChain.doFilter(request, response);
    }
    catch (NullPointerException | IllegalStateException e) {
      throw new CustomException(ErrorCode.NOT_FOUND_TOKEN);
    } catch (SecurityException | MalformedJwtException e) {
      throw new CustomException(ErrorCode.INVALID_TOKEN);
    } catch (ExpiredJwtException e) {
      throw new CustomException(ErrorCode.EXPIRED_TOKEN);
    } catch (UnsupportedJwtException e) {
      throw new CustomException(ErrorCode.UNSUPPORTED_TOKEN);
    } catch (Exception e) {
      e.printStackTrace();
      throw new BadCredentialsException("throw new exception");
    }
    // endpoint 로 토큰 만료 시 refresh 토큰을 검사하는 로직 필요
  }

  private void getAuthentication(String token) {
    JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(
        token);
    Authentication authenticate = authenticationManager.authenticate(
        authenticationToken);

    SecurityContextHolder.getContext()
        .setAuthentication(authenticate);
  }

  private String getToken(HttpServletRequest request) {
    String authorization = request.getHeader("Authorization");
    if (StringUtils.hasText(authorization) && authorization.startsWith(
        "Bearer")) {
      String[] arr = authorization.split(" ");
      return arr[1];
    }
    return null;
  }
}
