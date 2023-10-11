package com.beeword.ws.user;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class User implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8421768845853099274L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "{beeword.constraints.username.NotNull.message}")
	@Size(min = 4, max = 255, message = "{beeword.constraints.username.Size.message}")
	@UniqueUsername(message = "{beeword.constraints.username.UniqueUsername.message}")
	private String username;
	
	@NotNull(message = "{beeword.constraints.displayName.NotNull.message}")
	@Size(min = 4, max = 255, message = "{beeword.constraints.displayName.Size.message}")
	private String displayName;
	
	@NotNull(message = "{beeword.constraints.password.NotNull.message}")
	@Size(min = 8, max = 255, message = "{beeword.constraints.password.Size.message}")
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
			 message = "{beeword.constraints.password.Pattern.NotNull.message}")
	private String password;
	
	@Lob
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
