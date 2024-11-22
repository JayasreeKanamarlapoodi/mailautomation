package com.mail.automation.entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

@Entity
public class Trainee {

	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO )
	private int Id;
	
	@Column(nullable=false)
	private String traineeName;
	
	@Column(nullable=false)
	private String mail;
	
	@Column(nullable=false)
	private Long mobileNumber;

	@Override
	public String toString() {
		return "Trainee [Id=" + Id + ", Name=" + traineeName + ", Mail=" + mail + ", Number=" + mobileNumber + "]";
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String gettraineeName() {
		return traineeName;
	}

	public void settraineeName(String traineeName) {
		this.traineeName= traineeName;
	}

	public String getmail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Long getmobileNumber() {
		return mobileNumber;
	}

	public void setmobileNumber(Long number) {
		mobileNumber = number;
	}
}
