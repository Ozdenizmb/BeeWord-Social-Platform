package com.beeword.ws.shared;

public class GenericResponse {

	String message;
	
	public GenericResponse(String message) {
		this.message = message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
	
}
