package com.zerobase.hoops.gameCreator.exception;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Custom Error를 잡아줄 Handler
     */
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e){
        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }

    /**
     * 유효성 검사 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorException> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        List<String> errorsList = ex.getAllErrors().stream().
            map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
        return ResponseEntity.ok(new ErrorException("400", "Validation failure", errorsList));
    }

}
