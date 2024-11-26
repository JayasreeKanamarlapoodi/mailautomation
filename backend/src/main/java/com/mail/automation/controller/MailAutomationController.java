package com.mail.automation.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mail.automation.entity.Trainee;
import com.mail.automation.repository.MailAutomationRepo;
import jakarta.mail.internet.MimeMessage;


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
		mailSender.send(message);
		return mailAutomationRepo.save(trainee);
	}
	
	@PostMapping("/traineesWithAttachment")
	public String traineeEntryWithAttachment(@RequestBody Trainee trainee,@Value("${file.path}")String filePath){
		try {
		MimeMessage message=mailSender.createMimeMessage();
		MimeMessageHelper helper=new MimeMessageHelper(message,true);
		helper.setTo(trainee.getmail());
		String subject="testing";
		helper.setSubject(subject);
		helper.setText("Hi" +trainee.gettraineeName()+ "Welcome to training");
	    helper.addAttachment("Jayasree_Kanamarlapoodi_Resume.pdf", new File("C:\\Users\\HP\\Downloads\\Jayasree_Kanamarlapoodi_Resume.pdf"));
		mailSender.send(message);
		mailAutomationRepo.save(trainee);
		return "success";
		}
		catch(Exception e)
		{
			return e.getMessage();
			
		}
	}
	
}
