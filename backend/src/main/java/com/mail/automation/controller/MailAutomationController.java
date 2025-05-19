package com.mail.automation.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mail.automation.db1.entity.*;
import com.mail.automation.db2.entity.Trainee;
import com.mail.automation.db2.repository.MailAutomationRepo;
import com.mail.automation.security.JWTUtility;
import com.mail.automation.services.MailAutomationService;
import java.util.Map;




@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true") 
@RestController
@RequestMapping("/api")

public class MailAutomationController {
	
	 @Autowired
	  private MailAutomationRepo mailAutomationRepo;
	 
	 @Autowired
	 private MailAutomationService service;
	 
	 @Autowired
		private JWTUtility jwt;
	 

	@PostMapping("/trainees")
	public ResponseEntity<?> traineeEntry(@RequestBody Trainee trainee,@RequestParam String key)
	{
		Trainee savedTrainee=service.sendingMail(trainee,key);
		if(savedTrainee!=null)
		return ResponseEntity.status(HttpStatus.OK).body(Map.of(
				"trainee",savedTrainee,
					"message","Saved Successfully"));
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Something error,Please Try Again"));
	}	
	
	@GetMapping("/alltrainees")
	public List<Trainee> getAllTrainees()
	{
		return mailAutomationRepo.findAll();
	}
	
	@PutMapping("/updateStatus")
	public ResponseEntity<String> updateEmployeeStatus(@RequestBody Map<Object,Object> requestBody){
		System.out.println("put mapping");
		service.updateEmployeeStatus(requestBody);
		return ResponseEntity.ok("Status updated");
	}
	
	@PostMapping("/adminVerification")
	public ResponseEntity<?> adminVerification(@RequestBody Admin admin)
	{
		boolean existed=service.passwordVerification(admin);
		if(existed)
		{
			String token=jwt.generateToken(admin.getUsername());
			return ResponseEntity.ok(Map.of(
	                "token", token,
	                "username", admin.getUsername(),
	                "message", "Login successful"
	            ));
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
	}
}
