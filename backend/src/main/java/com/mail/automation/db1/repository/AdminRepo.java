package com.mail.automation.db1.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mail.automation.db1.entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {
    Optional<Admin> findByUsername(String username);
}
