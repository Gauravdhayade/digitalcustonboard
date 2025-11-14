package com.technorun.digitalcustonboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.technorun.digitalcustonboard.entity.UserProfileEntity;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
	UserProfileEntity findByEmail(String email);

	UserProfileEntity findByPan(String pan);
}
