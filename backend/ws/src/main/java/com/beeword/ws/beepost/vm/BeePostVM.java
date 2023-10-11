package com.beeword.ws.beepost.vm;

import com.beeword.ws.beepost.BeePost;
import com.beeword.ws.user.vm.UserVM;

import lombok.Data;

@Data
public class BeePostVM {

	private long id;
	
	private String content;
	
	private long timestamp;
	
	private UserVM user;
	
	public BeePostVM(BeePost beePost) {
		this.setId(beePost.getId());
		this.setContent(beePost.getContent());
		this.setTimestamp(beePost.getTimestamp().getTime());
		this.setUser(new UserVM(beePost.getUser()));
	}
	
}
