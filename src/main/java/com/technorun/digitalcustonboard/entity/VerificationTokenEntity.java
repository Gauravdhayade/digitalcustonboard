package com.technorun.digitalcustonboard.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data	
@NoArgsConstructor
@Entity
@Table(name = "verification_token")
public class VerificationTokenEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String token; // the OTP (or random string)
	private LocalDateTime expiresAt;
	private boolean used = false;

	@OneToOne
	@JoinColumn(name = "user_id")
	private UserProfileEntity user;

	// getters / setters
}