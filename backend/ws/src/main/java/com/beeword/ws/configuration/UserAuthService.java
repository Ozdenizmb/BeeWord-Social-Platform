package com.beeword.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.beeword.ws.user.User;
import com.beeword.ws.user.UserRepository;

@Service
public class UserAuthService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User inDatabase = userRepository.findByUsername(username);
		
		if(inDatabase == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return inDatabase;
	}

}
