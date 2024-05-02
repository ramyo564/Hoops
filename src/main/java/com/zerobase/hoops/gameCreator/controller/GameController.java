package com.zerobase.hoops.gameCreator.controller;

import com.zerobase.hoops.gameCreator.dto.GameDto;
import com.zerobase.hoops.gameCreator.service.GameCreatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/game-creator")
@RequiredArgsConstructor
public class GameController {

  private final GameCreatorService gameCreatorService;

  /**
   * 게임 생성
   */
  @PostMapping("/game/create")
  public ResponseEntity<?> createGame(@RequestBody @Validated GameDto.CreateRequest request,
      @RequestHeader("Authorization") String token) throws Exception {
    GameDto.CreateResponse result = this.gameCreatorService.createGame(request, token);
    return ResponseEntity.ok(result);
  }

  /**
   * 게임 수정
   */
  @PutMapping("/game/update")
  public ResponseEntity<?> updateGame(@RequestBody @Validated GameDto.UpdateRequest request,
      @RequestHeader("Authorization") String token) throws Exception {
    GameDto.UpdateResponse result = this.gameCreatorService.updateGame(request, token);
    return ResponseEntity.ok(result);
  }

  /**
   * 게임 삭제
   */
  @DeleteMapping("/game/delete")
  public ResponseEntity<?> deleteGame(@RequestBody @Validated GameDto.DeleteRequest request,
      @RequestHeader("Authorization") String token) throws Exception {
    GameDto.DeleteResponse result = this.gameCreatorService.delete(request, token);
    return ResponseEntity.ok(result);
  }

}
