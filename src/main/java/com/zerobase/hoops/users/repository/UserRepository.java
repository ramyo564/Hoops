package com.zerobase.hoops.users.repository;

import com.zerobase.hoops.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  boolean existsById(String id);

  boolean existsByEmail(String email);

  boolean existsByNickName(String nickName);

  UserEntity findById(String id);
}
