package com.technorun.digitalcustonboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {

	Optional<UserProfileEntity> findByEmail(String email);

	UserProfileEntity findByPan(String pan);
}
