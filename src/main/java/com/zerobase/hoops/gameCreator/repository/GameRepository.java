package com.zerobase.hoops.gameCreator.repository;

import com.zerobase.hoops.entity.GameEntity;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends
    JpaRepository<GameEntity, Long> {

  Optional<GameEntity> findByGameIdAndDeletedDateNull(Long gameId);

  Optional<Long> countByStartDateBetweenAndAddressAndDeletedDateNull(LocalDateTime beforeDatetime, LocalDateTime afterDateTime, String address);

  Optional<Long> countByStartDateBetweenAndAddressAndDeletedDateNullAndGameIdNot(LocalDateTime beforeDatetime, LocalDateTime afterDateTime, String address,
      Long gameId);

  Optional<Long> countByDeletedDateNullAndUserEntityUserId(Long userId);
}


