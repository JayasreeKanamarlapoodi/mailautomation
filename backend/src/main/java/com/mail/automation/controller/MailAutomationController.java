package com.mail.automation.controller;

import java.io.File;
import java.nio.file.Files;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mail.automation.entity.Trainee;
import com.mail.automation.entity.TraineeObject;
import com.mail.automation.repository.MailAutomationRepo;
import com.mail.automation.repository.MailRepo;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;


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
	public String traineeEntryWithAttachment(@RequestBody Trainee trainee){
		try {
		MimeMessage message=mailSender.createMimeMessage();
		MimeMessageHelper helper=new MimeMessageHelper(message,true);
		helper.setTo(trainee.getmail());
		String subject="testing";
		helper.setSubject(subject);
		helper.setText("Hi" +trainee.gettraineeName()+ "Welcome to training");
	    helper.addAttachment("jayapplogo.jpg", new File("C:\\Users\\HP\\Downloads\\jayapplogo.jpg"));
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
	@PostMapping("/traineesWithHtmlBody")
	public String traineesWithHtmlBody(@RequestBody Trainee trainee){
		try {
		MimeMessage message=mailSender.createMimeMessage();
		MimeMessageHelper helper=new MimeMessageHelper(message,true);
		helper.setTo(trainee.getmail());
		helper.setSubject("testing");
		ClassPathResource resource=new ClassPathResource("templates/mailContent.html");
		String htmlContent=new String(Files.readAllBytes(resource.getFile().toPath()));
		 ClassPathResource imageFile = new ClassPathResource("images/jayapplogo.jpg");
	        helper.addInline("embeddedImage", imageFile);
		helper.setText(htmlContent,true);
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

@RestController
@RequestMapping("/trainee")
@CrossOrigin(origins = "http://localhost:3000")
class MailAutomation {
	@Autowired
	private MailRepo mail;
	
	@PostMapping(value = "/fulldetails")
    public String traineeEntry(
            @RequestPart("tobj") String tobjJson,   // JSON string for trainee details
            @RequestPart("img") MultipartFile img,  // Image file
            @RequestPart("file") MultipartFile file) {  // Document file

        try {
            // Manually convert the JSON string into a TraineeObject
            ObjectMapper objectMapper = new ObjectMapper();
            TraineeObject tobj = objectMapper.readValue(tobjJson, TraineeObject.class);

            // Log the received data for debugging
            System.out.println("Received trainee details: " + tobj);
            System.out.println("Received image file: " + img.getOriginalFilename());
            System.out.println("Received document file: " + file.getOriginalFilename());

            // Process the image file
            tobj.setImgName(img.getOriginalFilename());
            tobj.setImgContent(img.getBytes());  // Set the image content (binary data)

            // Process the document file
            tobj.setFileName(file.getOriginalFilename());
            tobj.setFile(file.getBytes());  // Set the document content (binary data)

            // If you're saving this object to the database, you can save the `tobj` object
            // For example, assuming you have a service to save it:
            // traineeService.save(tobj);
            
            System.out.println("Received trainee details: " + tobj);
            mail.save(tobj);

            return "Success: Trainee details saved successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
 
}
