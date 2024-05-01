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

@Entity(name = "apply_game")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyGameEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long applyId;

  private String status;

  private String content;

  private LocalDateTime createdDate;

  private LocalDateTime deletedDate;

  @ManyToOne
  @JoinColumn(name = "game_id")
  private GameEntity gameEntity;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity userEntity;
}
