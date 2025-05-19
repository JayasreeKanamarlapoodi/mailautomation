package com.mail.automation.services;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.mail.automation.db1.entity.Admin;
import com.mail.automation.db1.repository.AdminRepo;
import com.mail.automation.db2.entity.Trainee;
import com.mail.automation.db2.repository.MailAutomationRepo;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailAutomationService {
	
	@Autowired
	 private MailAutomationRepo mailAutomationRepo;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AdminRepo adminrepo;
	
	
	
	
	public boolean passwordVerification(Admin admin)
	{
		System.out.println("username" +admin.getUsername());
		Optional<Admin> adminObj=adminrepo.findByUsername(admin.getUsername());
		if(adminObj.isPresent())
		{
		String storedPassword=adminObj.get().getPassword();
		boolean matched=passwordEncoder.matches(admin.getPassword(),storedPassword);
		return matched;
		}
		else
		{
			return false;
		}
	}

	
	public Trainee sendingMail(Trainee trainee,String key)
	{
		String subject="Testing Mail";
		if("plainmail".equals(key))
		{
			System.out.println("plain_mail");
			SimpleMailMessage message=new SimpleMailMessage();
			String text="Hello" +trainee.gettraineeName()+ "Welcome to training";
			message.setSubject(subject);
			message.setText(text);
			message.setTo(trainee.getmail());
			mailSender.send(message);
		}
		else if("attachmentmail".equals(key))
		{
			try {
				MimeMessage mimemessage=mailSender.createMimeMessage();
				MimeMessageHelper helper=new MimeMessageHelper(mimemessage,true);
				helper.setTo(trainee.getmail());
				helper.setSubject(subject);
				helper.setText("Hi" +trainee.gettraineeName()+ "Welcome to training");
				ClassPathResource imageFile=new ClassPathResource("images/jayapplogo.jpg");
			    helper.addAttachment("jayapplogo.jpg",imageFile);
			    helper.addAttachment("Jayasree_Kanamarlapoodi_Resume.pdf", new File("C:\\Users\\HP\\Downloads\\Jayasree_Kanamarlapoodi_Resume.pdf"));
				mailSender.send(mimemessage);
			}
			catch(Exception e)
			{
				e.getMessage();
				
			}
		}
		else if("htmlbody".equals(key))
		{
			try {
				MimeMessage mimemessage=mailSender.createMimeMessage();
				MimeMessageHelper helper=new MimeMessageHelper(mimemessage,true);
				helper.setTo(trainee.getmail());
				helper.setSubject(subject);
				Context context=new Context();
				context.setVariable("name",trainee.gettraineeName());
				  // Set image URL (assuming the server runs at localhost:8080)
		        String imageUrl = "http://localhost:8080/images/jayapplogo.jpg"; // Change if deployed
		        context.setVariable("imageUrl", imageUrl);
				
				String htmlContent=templateEngine.process("mailContent", context);
				helper.setText(htmlContent,true);
			    helper.addAttachment("Jayasree_Kanamarlapoodi_Resume.pdf", new File("C:\\Users\\HP\\Downloads\\Jayasree_Kanamarlapoodi_Resume.pdf"));
			    mailSender.send(mimemessage);
			}
			catch(Exception e)
			{
				e.getMessage();
				
			}
		}
		saveToExcel();
		return mailAutomationRepo.save(trainee);
	}
	
	
	//updating the status
	public String updateEmployeeStatus(Map<Object,Object> requestBody)
	{
		System.out.println(requestBody.get(requestBody));
		try {
//			const trainee=mailAutomationRepo.findAllById(requestBody.id);
		}catch(Exception e){
			e.getMessage();
		}
		return "success";
	}
	
	// Excel method to store the records
	
		public void saveToExcel()
		{
			List<Trainee> trainees=mailAutomationRepo.findAll();
			
			try(Workbook workbook =new XSSFWorkbook())
			{
				Sheet sheet=workbook.createSheet("TraineeDetails");
				
				Row headerRow=sheet.createRow(0);  // to create column headers
				
				String[] columnNames={"Id","Name","Email-ID","Mobile Number"};
				
				for(int i=0;i<columnNames.length;i++)
				{
					Cell cell=headerRow.createCell(i);
					cell.setCellValue(columnNames[i]);
				}
				
				int rowNum=1;
				
				for(Trainee trainee:trainees)
				{
					Row row=sheet.createRow(rowNum++);
					row.createCell(0).setCellValue(trainee.getId());
					row.createCell(1).setCellValue(trainee.gettraineeName());
					row.createCell(2).setCellValue(trainee.getmail());
					row.createCell(3).setCellValue(trainee.getmobileNumber());
				}
				

		        // **Save to a file**
		        try (FileOutputStream fileOut = new FileOutputStream("D:\\trainee_details.xlsx")) {
		            workbook.write(fileOut);
		        }

		        System.out.println("Excel file 'trainee_details.xlsx' created successfully!");

		    } catch (Exception e) {
		        e.printStackTrace();
		    }
		}
		
}


