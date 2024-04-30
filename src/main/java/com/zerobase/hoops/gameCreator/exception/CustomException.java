package com.zerobase.hoops.gameCreator.exception;

import com.zerobase.hoops.gameCreator.type.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
  ErrorCode errorCode;
}
