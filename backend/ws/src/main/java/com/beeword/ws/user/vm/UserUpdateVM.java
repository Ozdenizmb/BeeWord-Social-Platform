package com.beeword.ws.user.vm;

import com.beeword.ws.shared.FileType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateVM {
	
	@NotNull(message = "{beeword.constraints.displayName.NotNull.message}")
	@Size(min = 4, max = 255, message = "{beeword.constraints.displayName.Size.message}")
	private String displayName;
	
	@FileType(types = { "image/png", "image/jpeg" }, message = "{beeword.constraints.FileType.message}")
	private String image;
	
}
