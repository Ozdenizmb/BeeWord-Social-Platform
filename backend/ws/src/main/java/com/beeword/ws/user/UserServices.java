package com.beeword.ws.user;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.beeword.ws.error.NotFoundException;
import com.beeword.ws.file.FileServices;
import com.beeword.ws.user.vm.UserUpdateVM;

@Service
public class UserServices {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	FileServices fileServices;
	
	public UserServices(UserRepository userRepository, PasswordEncoder passwordEncoder, FileServices fileServices) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.fileServices = fileServices;
	}
	
	public void save(User user) {
		String encoderPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encoderPassword);
		
		userRepository.save(user);
	}
	
	public Page<User> getUsers(Pageable page, User userInfo) {
		if(userInfo != null) {
			return userRepository.findByUsernameNot(userInfo.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User userDB =  userRepository.findByUsername(username);
		
		if(userDB == null) {
			throw new NotFoundException();
		}
		return userDB;
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User userDB = getByUsername(username);
		userDB.setDisplayName(updatedUser.getDisplayName());
		
		if(updatedUser.getImage() != null) {
			String oldImageName = userDB.getImage();
			try {
				String storedFileName = fileServices.writeStringToFile(updatedUser.getImage(), username);
				userDB.setImage(storedFileName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileServices.deleteImage(oldImageName);
		}
		
		return userRepository.save(userDB);
	}
	
}
