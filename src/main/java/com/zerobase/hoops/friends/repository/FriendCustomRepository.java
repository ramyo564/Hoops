package com.zerobase.hoops.friends.repository;

import com.zerobase.hoops.friends.dto.FriendDto.InviteListResponse;
import com.zerobase.hoops.friends.dto.FriendDto.ListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FriendCustomRepository {

  Page<ListResponse> findBySearchFriendList(
      Long userId, String nickName, Pageable pageable);

  public Page<InviteListResponse> findByMyInviteFriendList(Long userId,
      Long gameId, Pageable pageable);
}
