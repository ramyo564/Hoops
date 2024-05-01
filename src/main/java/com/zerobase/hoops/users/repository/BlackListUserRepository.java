package com.zerobase.hoops.users.repository;

import com.zerobase.hoops.entity.BlackListUserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackListUserRepository extends
    JpaRepository<BlackListUserEntity, Long> {

  Optional<BlackListUserEntity> findByEmail(String email);

}
