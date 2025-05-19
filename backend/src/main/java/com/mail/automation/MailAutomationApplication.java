package com.mail.automation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MailAutomationApplication {

	public static void main(String[] args) {
		 BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	        String rawPassword = "admin123";
	        String hashedPassword = encoder.encode(rawPassword);
	        System.out.println("Hashed Password: " + hashedPassword);
		SpringApplication.run(MailAutomationApplication.class, args);
	}

}
