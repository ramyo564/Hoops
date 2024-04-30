package com.zerobase.hoops.gameCreator.service;

import static com.zerobase.hoops.gameCreator.type.ErrorCode.GAME_NOT_FOUND;
import static com.zerobase.hoops.gameCreator.type.ErrorCode.NOT_GAME_CREATOR;
import static com.zerobase.hoops.gameCreator.type.ErrorCode.NOT_UPDATE_HEADCOUNT;
import static com.zerobase.hoops.gameCreator.type.ErrorCode.NOT_UPDATE_MAN;
import static com.zerobase.hoops.gameCreator.type.ErrorCode.NOT_UPDATE_WOMAN;
import static com.zerobase.hoops.gameCreator.type.ErrorCode.USER_NOT_FOUND;

import com.zerobase.hoops.entity.ApplyGameEntity;
import com.zerobase.hoops.entity.GameEntity;
import com.zerobase.hoops.entity.UserEntity;
import com.zerobase.hoops.gameCreator.dto.GameDto.CreateRequest;
import com.zerobase.hoops.gameCreator.dto.GameDto.CreateResponse;
import com.zerobase.hoops.gameCreator.dto.GameDto.DeleteRequest;
import com.zerobase.hoops.gameCreator.dto.GameDto.DeleteResponse;
import com.zerobase.hoops.gameCreator.dto.GameDto.UpdateRequest;
import com.zerobase.hoops.gameCreator.dto.GameDto.UpdateResponse;
import com.zerobase.hoops.gameCreator.exception.CustomException;
import com.zerobase.hoops.gameCreator.repository.ApplyGameRepository;
import com.zerobase.hoops.gameCreator.repository.GameRepository;
import com.zerobase.hoops.gameCreator.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class GameCreatorService {

  private final GameRepository gameRepository;

  private final ApplyGameRepository applyGameRepository;

  private final UserRepository userRepository;

  /**
   * 게임 생성
   */
  public CreateResponse createGame(CreateRequest request) throws Exception {
    log.info("createGame start");
    // 유저 아이디로 유저 조회
    var user = this.userRepository.findById(request.getUserId())
        .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

    GameEntity gameEntity = CreateRequest.toEntity(request);

    gameEntity.setUserEntity(user);

    this.gameRepository.save(gameEntity);

    log.info("createGame end");

    return CreateResponse.toDto(gameEntity);
  }

  /**
   * 게임 수정
   */
  public UpdateResponse updateGame(UpdateRequest request) throws Exception {
    log.info("updateGame start");

    // 게임 아이디로 게임 조회, 먼저 삭제 되었는지 조회
    var game =
        this.gameRepository.findByGameIdAndDeletedDateNull(request.getGameId())
        .orElseThrow(() -> new CustomException(GAME_NOT_FOUND));

    //TODO : 자신이 경기 개최자가 아니면 수정 못하게 jwt 나오면 바꿔야함
    if(request.getUserId() != game.getUserEntity().getUserId()) {
      throw new CustomException(NOT_GAME_CREATOR);
    }

    // 변경 하려는 인원수가 수락한 인원수보다 적으면 에러 발생
    Long headCount =
        this.applyGameRepository.countByStatusAndGameEntityGameId
            ("ACCEPT", request.getGameId());

    if(request.getHeadCount() < headCount) {
      throw new CustomException(NOT_UPDATE_HEADCOUNT);
    }

    // 변경하려는 성별 검사 ALL 일때는 패스
    String gender = request.getGender();
    if(gender.equals("MAN") || gender.equals("WOMAN")) {
      String queryGender = request.getGender().equals("MAN") ? "WOMAN" : "MAN";

      Long count = this.applyGameRepository
          .countByStatusAndGameEntityGameIdAndUserEntityGender
          ("ACCEPT", request.getGameId(), queryGender);

      log.info(count.toString());

      // 한명이라도 있으면 에러 발생
      if(count > 1) {
        if(gender.equals("MAN")) {
          throw new CustomException(NOT_UPDATE_MAN);
        } else {
          throw new CustomException(NOT_UPDATE_WOMAN);
        }
      }
    }

    GameEntity gameEntity = GameEntity.builder()
        .gameId(request.getGameId())
        .title(request.getTitle())
        .content(request.getContent())
        .headCount(request.getHeadCount())
        .fieldStatus(request.getFieldStatus())
        .gender(request.getGender())
        .startDate(request.getStartDate())
        .createdDate(game.getCreatedDate())
        .inviteYn(request.getInviteYn())
        .address(request.getAddress())
        .cityName(request.getCityName())
        .matchFormat(request.getMatchFormat())
        .userEntity(game.getUserEntity())
        .build();

    this.gameRepository.save(gameEntity);

    log.info("updateGame end");

    return UpdateResponse.toDto(gameEntity);
  }

  /**
   * 게임 삭제
   */
  public DeleteResponse delete(DeleteRequest request) throws Exception {
    log.info("deleteGame start");

    // 게임 아이디로 게임 조회, 먼저 삭제 되었는지 조회
    var game = this.gameRepository.findByGameIdAndDeletedDateNull(request.getGameId())
        .orElseThrow(() -> new CustomException(GAME_NOT_FOUND));
    // 유저 아이디로 유저 조회
    var user = this.userRepository.findById(request.getUserId())
        .orElseThrow(() -> new CustomException(USER_NOT_FOUND));


    //TODO : 관리자 판별 jwt 나오면 바꿔야 함
    boolean userFlag = false;

    for(String role : user.getRoles()) {
      if(role.equals("ROLE_USER")) {
        userFlag = true;
        break;
      }
    }

    // 일반 유저 일때 관리자 일때는 PASS
    if(userFlag) {
      //TODO : 자신이 경기 개최자가 아니면 수정 못하게 jwt 나오면 바꿔야함
      if(request.getUserId() != game.getUserEntity().getUserId()) {
        throw new CustomException(NOT_GAME_CREATOR);
      }
    }

    // TODO : 게임 삭제 전에 ACCEPT 멤버들 다 WITHDRAW 그리고 APPLY 멤버들 다 CANCEL


    GameEntity gameEntity = GameEntity.builder()
        .gameId(game.getGameId())
        .title(game.getTitle())
        .content(game.getContent())
        .headCount(game.getHeadCount())
        .fieldStatus(game.getFieldStatus())
        .gender(game.getGender())
        .startDate(game.getStartDate())
        .createdDate(game.getCreatedDate())
        .deletedDate(LocalDateTime.now())
        .inviteYn(game.getInviteYn())
        .address(game.getAddress())
        .cityName(game.getCityName())
        .matchFormat(game.getMatchFormat())
        .userEntity(game.getUserEntity())
        .build();

    this.gameRepository.save(gameEntity);

    log.info("deleteGame end");

    return DeleteResponse.toDto(gameEntity);
  }
}
