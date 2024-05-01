package com.zerobase.hoops.users.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailProvider {

  private final JavaMailSender javaMailSender;
  private final String SUBJECT = "[HOOPS] 인증 메일입니다.";

  public boolean sendCertificationMail(String id, String email,
      String certificationNumber) {
    try {
      MimeMessage message = javaMailSender.createMimeMessage();
      MimeMessageHelper messageHelper =
          new MimeMessageHelper(message, true);

      String htmlContent = getCertificationMessage(
          id, email, certificationNumber);

      messageHelper.setTo(email);
      messageHelper.setSubject(SUBJECT);
      messageHelper.setText(htmlContent, true);

      javaMailSender.send(message);
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }

    return true;
  }

  private String getCertificationMessage(String id, String email,
      String certificationNumber) {
    String certificationMessage = "";
    certificationMessage +=
        "<h1 style='text-align: center;'>"
            + "[HOOPS] 인증 메일"
            + "</h1>";
    certificationMessage +=
        "<h3 style='text-align: center;'>"
            + "인증 링크 : "
            + "<a href=\"http://localhost:8080/api/user/signup/confirm?id=" + id
            + "&email=" + email + "&certificationNumber=" + certificationNumber
            + "\">"
            + "이곳을 눌러 인증을 완료해주세요. 링크는 3분 동안 유효합니다."
            + "</a>"
            + "</h3>";

    return certificationMessage;
  }

}
