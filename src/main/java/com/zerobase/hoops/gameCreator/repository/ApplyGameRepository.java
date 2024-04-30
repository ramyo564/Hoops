package com.zerobase.hoops.gameCreator.repository;

import com.zerobase.hoops.entity.ApplyGameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyGameRepository extends
    JpaRepository<ApplyGameEntity, Long> {

  Long countByStatusAndGameEntityGameId(String accept, Long gameId);

  Long countByStatusAndGameEntityGameIdAndUserEntityGender(String accept, Long gameId,
      String queryGender);
}


