package com.zerobase.hoops.gameCreator.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER-001", "사용자를 찾을 수 없습니다."),
  GAME_NOT_FOUND(HttpStatus.NOT_FOUND, "GAME-001", "경기를 찾을 수 없습니다."),
  NOT_GAME_CREATOR(HttpStatus.NOT_ACCEPTABLE, "GAME-002", "경기 개최자가 아닙니다."),
  NOT_UPDATE_HEADCOUNT(HttpStatus.BAD_REQUEST, "GAME-003", "설정 하려는 인원수가 적습니다."),
  NOT_UPDATE_MAN(HttpStatus.BAD_REQUEST, "GAME-004", "여자가 그룹에 참가중입니다."),
  NOT_UPDATE_WOMAN(HttpStatus.BAD_REQUEST, "GAME-005", "남자가 그룹에 참가중입니다.");

  private final HttpStatus httpStatus;
  private final String code;
  private final String message;
}
