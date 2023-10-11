package com.beeword.ws.beepost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beeword.ws.beepost.vm.BeePostVM;
import com.beeword.ws.shared.CurrentUser;
import com.beeword.ws.shared.GenericResponse;
import com.beeword.ws.user.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class BeePostController {
	
	@Autowired
	BeePostServices beePostServices;

	@PostMapping("/posts")
	public GenericResponse savePost(@Valid @RequestBody BeePost body, @CurrentUser User user) {
		beePostServices.save(body, user);
		return new GenericResponse("Post is saved");
	}
	
	@GetMapping("/posts")
	public Page<BeePostVM> getPost(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page) {
		return beePostServices.getPost(page).map(BeePostVM::new);
	}
	
	@GetMapping("/users/{username}/posts")
	public Page<BeePostVM> getUserPost(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page) {
		return beePostServices.getPostOfUser(page, username).map(BeePostVM::new);
	}
	
}
