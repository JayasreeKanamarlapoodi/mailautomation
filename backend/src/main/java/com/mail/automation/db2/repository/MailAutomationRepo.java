package com.mail.automation.db2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mail.automation.db2.entity.Trainee;



@Repository
public interface MailAutomationRepo extends JpaRepository<Trainee,Integer>{

}

