package com.beeword.ws.beepost;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.beeword.ws.user.User;

public interface BeePostRepository extends JpaRepository<BeePost, Long> {

	Page<BeePost> findByUser(User user, Pageable page);
	
}
