package com.beeword.ws.shared;

import org.springframework.beans.factory.annotation.Autowired;

import com.beeword.ws.file.FileServices;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileTypeValidatior implements ConstraintValidator<FileType, String> {
	
	@Autowired
	FileServices fileService;
	
	String[] types;
	
	@Override
	public void initialize(FileType constraintAnnotation) {
		this.types = constraintAnnotation.types();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null || value.isEmpty()) {
			return true;
		}
		
		String fileType = fileService.detectType(value);
		
		for (String values : types) {
			if(fileType.equalsIgnoreCase(values)) {
				return true;
			}
		}
		return false;
	}

}
