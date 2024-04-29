package com.zerobase.hoops.entity;

import com.zerobase.hoops.gameCreator.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "game")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "game_id")
  private Long gameId;

  private String title;

  private String content;

  @Column(name = "head_count")
  private Long headCount;

  @Column(name = "field_status")
  private String fieldStatus;

  @Column(name = "start_at")
  private LocalDateTime startAt;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  @Column(name = "invite_yn")
  private Boolean inviteYn;

  private String address;

  @Column(name = "city_name")
  private String cityName;

  @Column(name = "match_format")
  private String matchFormat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity userEntity;
}
