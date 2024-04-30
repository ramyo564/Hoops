package com.zerobase.hoops.gameCreator.dto;

import com.zerobase.hoops.entity.GameEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class ApplyGameDto {

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class CreateRequest {
    @NotBlank(message = "제목은 필수 입력 값 입니다.")
    @Size(max = 50, message = "제목은 최대 50자 입니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력 값 입니다.")
    @Size(max = 300, message = "내용은 최대 300자 입니다.")
    private String content;

    @NotNull(message = "인원 수는 필수 입력 값 입니다.")
    private Long headCount;

    @NotBlank(message = "실내외는 필수 입력 값 입니다.")
    private String fieldStatus;

    @NotNull(message = "시작 날짜는 필수 입력 값 입니다.")
    private LocalDateTime startDate;

    @NotNull(message = "친구 초대 여부는 필수 입력 값 입니다.")
    private Boolean inviteYn;

    @NotBlank(message = "주소는 필수 입력 값 입니다.")
    @Size(max = 200, message = "주소는 최대 200자 입니다.")
    private String address;

    @NotNull(message = "도시 이름은 필수 입력 값 입니다.")
    private String cityName;

    @NotNull(message = "경기 형식은 필수 입력 값 입니다.")
    private String matchFormat;

    //TODO : 이부분 나중에 삭제 테스트 용도
    private Long userId;

    public static GameEntity toEntity(GameDto.CreateRequest request){
      return GameEntity.builder()
          .title(request.getTitle())
          .content(request.getContent())
          .headCount(request.getHeadCount())
          .fieldStatus(request.getFieldStatus())
          .startDate(request.getStartDate())
          .inviteYn(request.getInviteYn())
          .address(request.getAddress())
          .matchFormat(request.getMatchFormat())
          .build();
    }

  }

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class CreateResponse {
    private String title;

    private String content;

    private Long headCount;

    private String fieldStatus;

    private LocalDateTime startAt;

    private LocalDateTime createdAt;

    private Boolean inviteYn;

    private String address;

    private String cityName;

    private String matchFormat;

    public static GameDto.CreateResponse fromEntity(GameEntity gameEntity){
      return GameDto.CreateResponse.builder()
          .title(gameEntity.getTitle())
          .content(gameEntity.getContent())
          .headCount(gameEntity.getHeadCount())
          .fieldStatus(gameEntity.getFieldStatus())
          .startDate(gameEntity.getStartDate())
          .createdDate(gameEntity.getCreatedDate())
          .inviteYn(gameEntity.getInviteYn())
          .address(gameEntity.getAddress())
          .matchFormat(gameEntity.getMatchFormat())
          .build();
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class UpdateRequest {
    @NotNull(message = "게임 아이디는 필수 입력 값 입니다.")
    private Long gameId;

    @NotBlank(message = "제목은 필수 입력 값 입니다.")
    @Size(max = 50, message = "제목은 최대 50자 입니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력 값 입니다.")
    @Size(max = 300, message = "내용은 최대 300자 입니다.")
    private String content;

    @NotNull(message = "인원 수는 필수 입력 값 입니다.")
    private Long headCount;

    @NotBlank(message = "실내외는 필수 입력 값 입니다.")
    private String fieldStatus;

    @NotNull(message = "시작 날짜는 필수 입력 값 입니다.")
    private LocalDateTime startDate;

    @NotNull(message = "친구 초대 여부는 필수 입력 값 입니다.")
    private Boolean inviteYn;

    @NotBlank(message = "주소는 필수 입력 값 입니다.")
    @Size(max = 200, message = "주소는 최대 200자 입니다.")
    private String address;

    @NotNull(message = "도시 이름은 필수 입력 값 입니다.")
    private String cityName;

    @NotNull(message = "경기 형식은 필수 입력 값 입니다.")
    private String matchFormat;

    //TODO : 이부분 나중에 삭제 테스트 용도
    private Long userId;
  }

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class UpdateResponse {
    private String title;

    private String content;

    private Long headCount;

    private String fieldStatus;

    private LocalDateTime startDate;

    private LocalDateTime createdDate;

    private Boolean inviteYn;

    private String address;

    private String cityName;

    private String matchFormat;

    public static GameDto.UpdateResponse fromEntity(GameEntity gameEntity){
      return GameDto.UpdateResponse.builder()
          .title(gameEntity.getTitle())
          .content(gameEntity.getContent())
          .headCount(gameEntity.getHeadCount())
          .fieldStatus(gameEntity.getFieldStatus())
          .startDate(gameEntity.getStartDate())
          .createdDate(gameEntity.getCreatedDate())
          .inviteYn(gameEntity.getInviteYn())
          .address(gameEntity.getAddress())
          .matchFormat(gameEntity.getMatchFormat())
          .build();
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class DeleteRequest {
    @NotNull(message = "게임 아이디는 필수 입력 값 입니다.")
    private Long gameId;

    //TODO : 이부분 나중에 삭제 테스트 용도
    private Long userId;
  }

  @Getter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class DeleteResponse {
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


    public static GameDto.DeleteResponse fromEntity(GameEntity gameEntity){
      return GameDto.DeleteResponse.builder()
          .title(gameEntity.getTitle())
          .content(gameEntity.getContent())
          .headCount(gameEntity.getHeadCount())
          .fieldStatus(gameEntity.getFieldStatus())
          .startDate(gameEntity.getStartDate())
          .createdDate(gameEntity.getCreatedDate())
          .deletedDate(gameEntity.getDeletedDate())
          .inviteYn(gameEntity.getInviteYn())
          .address(gameEntity.getAddress())
          .matchFormat(gameEntity.getMatchFormat())
          .build();
    }
  }

}
