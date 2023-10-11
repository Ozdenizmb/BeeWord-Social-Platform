package com.beeword.ws.beepost;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.beeword.ws.user.User;
import com.beeword.ws.user.UserServices;

@Service
public class BeePostServices {

	BeePostRepository beePostRepository;
	UserServices userServices;

	public BeePostServices(BeePostRepository beePostRepository, UserServices userServices) {
		super();
		this.beePostRepository = beePostRepository;
		this.userServices = userServices;
	}

	public void save(BeePost body, User user) {
		body.setTimestamp(new Date());
		body.setUser(user);
		beePostRepository.save(body);
	}

	public Page<BeePost> getPost(Pageable page) {
		return beePostRepository.findAll(page);
	}

	public Page<BeePost> getPostOfUser(Pageable page, String username) {
		User userDB = userServices.getByUsername(username);
		
		return beePostRepository.findByUser(userDB, page);
	}
	
}
