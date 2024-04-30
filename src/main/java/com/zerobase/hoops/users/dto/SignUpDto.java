package com.zerobase.hoops.users.dto;

import com.zerobase.hoops.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class SignUpDto {

  @Getter
  @Setter
  @NoArgsConstructor
  public static class Request {

    @NotBlank(message = "아이디를 입력하세요.")
    private String id;

    @NotBlank(message = "비밀번호를 입력하세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()])"
        + "[a-zA-Z0-9~!@#$%^&*()]{8,13}$")
    private String password;

    @NotBlank(message = "확인할 비밀번호를 입력하세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()])"
        + "[a-zA-Z0-9~!@#$%^&*()]{8,13}$")
    private String passwordCheck;

    @NotBlank(message = "이메일을 입력하세요.")
    @Email(message = "이메일 형식에 맞게 입력하세요.")
    private String email;

    @NotBlank(message = "이름을 입력하세요.")
    private String name;

    @NotBlank(message = "생년월일을 입력하세요.")
    private String birthday;

    @NotBlank(message = "성별을 선택하세요.")
    private String gender;

    @NotBlank(message = "별명을 입력하세요.")
    private String nickName;

    private String playStyle;
    private String ability;

    public static UserEntity toEntity(Request request) {
      List<String> userRoles = new ArrayList<>();
      userRoles.add("ROLE_USER");
      return UserEntity.builder()
          .id(request.getId())
          .password(request.getPassword())
          .email(request.getEmail())
          .name(request.getName())
          .birthday(request.getBirthday())
          .gender(request.getGender())
          .nickName(request.getNickName())
          .playStyle(request.getPlayStyle())
          .ability(request.getAbility())
          .roles(userRoles)
          .build();
    }
  }

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Response {

    private int userId;
    private String id;
    private String email;
    private String name;
    private String birthday;
    private String gender;
    private String nickName;
    private LocalDateTime crateAt;
    private String playStyle;
    private String ability;
    private List<String> roles;

    public static Response fromDto(UserDto userDto) {
      return Response.builder()
          .userId(userDto.getUserId())
          .id(userDto.getId())
          .email(userDto.getEmail())
          .name(userDto.getName())
          .birthday(userDto.getBirthday())
          .gender(userDto.getGender())
          .nickName(userDto.getNickName())
          .crateAt(userDto.getCreateAt())
          .playStyle(userDto.getPlayStyle())
          .ability(userDto.getAbility())
          .roles(userDto.getRoles())
          .build();
    }
  }

}
