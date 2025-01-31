package com.mail.automation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mail.automation.entity.Trainee;

@Repository
public interface MailAutomationRepo extends JpaRepository<Trainee,Integer>{

}

