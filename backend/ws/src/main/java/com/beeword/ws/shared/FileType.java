package com.beeword.ws.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { FileTypeValidatior.class })
public @interface FileType {

	String message() default "Unsupported file. Only jpeg, png supported";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
	String[] types();
}
