package com.technorun.digitalcustonboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long>{
	
	public UserProfileEntity findByEmail(String email);
	
	public UserProfileEntity findByPhone(Long phone);
	
	public UserProfileEntity findByPanCard(String panCard);

}
