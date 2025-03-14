package com.example.youandwe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.youandwe.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	
	Role findByName(String name);
//	Role findBYEmail(String email);

}
