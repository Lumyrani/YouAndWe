package com.example.youandwe.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor 
public class HelpRequestAPIException extends RuntimeException{
	   private HttpStatus status;
	    private String message;
}
