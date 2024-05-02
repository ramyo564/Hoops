package com.zerobase.hoops.gameCreator.repository;

import com.zerobase.hoops.entity.GameEntity;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends
    JpaRepository<GameEntity, Long> {

  Optional<Long> countByStartDateTimeBetweenAndAddressAndDeletedDateTimeNull(LocalDateTime beforeDatetime, LocalDateTime afterDateTime, String address);

  Optional<GameEntity> findByGameIdAndDeletedDateTimeNull(Long gameId);

  Optional<Long> countByDeletedDateTimeNullAndUserEntityUserId(Long userId);

  Optional<Long> countByStartDateTimeBetweenAndAddressAndDeletedDateTimeNullAndGameIdNot(
      LocalDateTime beforeDatetime, LocalDateTime afterDateTime,
      String address, Long gameId);
}


