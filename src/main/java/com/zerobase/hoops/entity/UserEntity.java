package com.zerobase.hoops.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id",nullable = false)
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
  private String birthday;

  @Column(nullable = false)
  private String gender;

  @Column(nullable = false)
  private String nickName;

  @Column(name = "play_style")
  private String playStyle;

  private String ability;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name =
      "user_id"))
  private List<String> roles;

  @CreationTimestamp
  @Column(name = "create_at",nullable = false)
  private LocalDateTime createAt;

  @Column(name = "delete_at",nullable = false)
  private LocalDateTime deleteAt;

  @ColumnDefault("false")
  @Column(name = "email_auth",nullable = false)
  private boolean emailAuth;

  public void verify() {
    this.emailAuth = true;
  }
}
