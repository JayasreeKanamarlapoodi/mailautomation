package com.mail.automation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mail.automation.entity.TraineeObject;


@Repository
public interface MailRepo extends JpaRepository<TraineeObject,Integer>{

}
