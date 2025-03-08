package com.example.youandwe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.youandwe.entity.HelpRequest;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {

}
