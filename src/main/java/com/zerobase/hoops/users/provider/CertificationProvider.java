package com.zerobase.hoops.users.provider;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import org.springframework.stereotype.Component;

@Component
public class CertificationProvider {

  public static String createCertificationNumber()
      throws NoSuchAlgorithmException {
    String certificationNumber;

    do {
      int sum = SecureRandom.getInstanceStrong().nextInt(999999);
      certificationNumber = String.valueOf(sum);
    } while (certificationNumber.length() != 6);

    return certificationNumber;
  }

}
