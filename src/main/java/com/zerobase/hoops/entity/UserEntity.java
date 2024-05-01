package com.zerobase.hoops.entity;

import com.zerobase.hoops.users.type.AbilityType;
import com.zerobase.hoops.users.type.GenderType;
import com.zerobase.hoops.users.type.PlayStyleType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int userId;

  @Column(nullable = false)
  private String id;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private LocalDate birthday;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private GenderType gender;

  @Column(nullable = false)
  private String nickName;

  @Enumerated(EnumType.STRING)
  private PlayStyleType playStyle;

  @Enumerated(EnumType.STRING)
  private AbilityType ability;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
      name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
  private List<String> roles;

  @Column(nullable = false)
  @CreatedDate
  private LocalDateTime createDate;

  private LocalDateTime deleteDate;

  @ColumnDefault("false")
  @Column(nullable = false)
  private boolean emailAuth;

  public void confirm() {
    this.emailAuth = true;
  }
}
