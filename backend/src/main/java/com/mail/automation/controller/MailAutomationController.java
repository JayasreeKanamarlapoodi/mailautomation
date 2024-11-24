package com.mail.automation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mail.automation.entity.Trainee;
import com.mail.automation.repository.MailAutomationRepo;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") 
public class MailAutomationController {
	
	 @Autowired
	  private MailAutomationRepo mailAutomationRepo;
	 
	 @Autowired 
	 private JavaMailSender mailSender;

	@PostMapping("/trainees")
	public Trainee traineeEntry(@RequestBody Trainee trainee){
		System.out.println("trainee details: "+trainee);
		SimpleMailMessage message=new SimpleMailMessage();
		message.setTo(trainee.getmail());
		String subject="testing";
		message.setSubject(subject);
		message.setText("Hello" +trainee.gettraineeName()+ "Welcome to training");
		message.setFrom(System.getenv("SMTP_USERNAME"));
		mailSender.send(message);
		return mailAutomationRepo.save(trainee);
	}
	
}
