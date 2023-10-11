package com.beeword.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beeword.ws.shared.CurrentUser;
import com.beeword.ws.shared.GenericResponse;
import com.beeword.ws.user.vm.UserUpdateVM;
import com.beeword.ws.user.vm.UserVM;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class UserController {
	
	@Autowired
	UserServices userServices;


	@PostMapping("/users")
	public GenericResponse createUser(@Valid @RequestBody User body) {
		userServices.save(body);
		
		return new GenericResponse("User Created!");
	}
	
	@GetMapping("/users")
	public Page<UserVM> getUser(Pageable page, @CurrentUser User userInfo) {
		return userServices.getUsers(page, userInfo).map((user) -> {
				return new UserVM(user);
		});
	}
	
	@GetMapping("/users/{username}")
	public UserVM getUser(@PathVariable String username) {
		User user = userServices.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == #loggedInUser.username")
	public UserVM uptadeUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username, @CurrentUser User loggedInUser) {
		User user = userServices.updateUser(username, updatedUser);
		return new UserVM(user);
	}
	
}
