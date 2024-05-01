package com.zerobase.hoops.entity;

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
  private Long gameId;

  private String title;

  private String content;

  private Long headCount;

  private String fieldStatus;

  private LocalDateTime startDate;

  private LocalDateTime createdDate;

  private LocalDateTime deletedDate;

  private Boolean inviteYn;

  private String address;

  private String cityName;

  private String matchFormat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity userEntity;
}
