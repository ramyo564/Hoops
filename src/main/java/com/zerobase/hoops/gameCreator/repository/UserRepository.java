package com.zerobase.hoops.gameCreator.repository;

import com.zerobase.hoops.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends
    JpaRepository<UserEntity, Long> {

}


