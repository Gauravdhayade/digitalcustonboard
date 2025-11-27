package com.technorun.digitalcustonboard.repository;

import com.technorun.digitalcustonboard.entity.KycEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KycRepository extends JpaRepository<KycEntity, Long> {
	KycEntity findByUserId(Long userId);
}