package com.zerobase.hoops.gameCreator.exception;

import com.zerobase.hoops.gameCreator.type.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponseEntity {
  private int status;
  private String name;
  private String code;
  private String message;

  public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e){
    return ResponseEntity
        .status(e.getHttpStatus())
        .body(ErrorResponseEntity.builder()
            .status(e.getHttpStatus().value())
            .code(e.getCode())
            .name(e.name())
            .message(e.getMessage())
            .build());
  }
}
