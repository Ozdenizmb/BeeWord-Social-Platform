package com.beeword.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beeword.ws.shared.CurrentUser;
import com.beeword.ws.user.User;
import com.beeword.ws.user.UserRepository;
import com.beeword.ws.user.vm.UserVM;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		
		return new UserVM(user);
		
	}
	
}
