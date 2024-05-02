package com.zerobase.hoops.gameCreator.service;

import com.zerobase.hoops.gameCreator.repository.ParticipantGameRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ParticipantGameService {

  private final ParticipantGameRepository participantGameRepository;

}
