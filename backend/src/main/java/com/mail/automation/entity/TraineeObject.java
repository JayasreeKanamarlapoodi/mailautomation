package com.mail.automation.entity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class TraineeObject {
	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO )
	private int Id;
	
	@Column(nullable=false)
	private String traineeName;
	
	@Column(nullable=false)
	private String mail;
	
	@Column(nullable=false)
	private Long mobileNumber;
	
	@Column(nullable=false)
	private String imgName;

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}

	public byte[] getImgContent() {
		return imgContent;
	}

	public void setImgContent(byte[] imgContent) {
		this.imgContent = imgContent;
	}

	@Lob
	@Column(nullable=false,columnDefinition = "LONGBLOB")
	private byte[] imgContent;
	
	@Override
	public String toString() {
		return "TraineeObject [Id=" + Id + ", traineeName=" + traineeName + ", mail=" + mail + ", mobileNumber="
				+ mobileNumber + ", imgName=" + imgName + ", imgContent=" + Arrays.toString(imgContent) + ", fileName="
				+ fileName + ", file=" + Arrays.toString(file) + "]";
	}

	@Column(nullable=false)
	private String fileName;
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Lob
	@Column(nullable=false,columnDefinition = "LONGBLOB")
	private byte[] file;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getTraineeName() {
		return traineeName;
	}

	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Long getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

}
