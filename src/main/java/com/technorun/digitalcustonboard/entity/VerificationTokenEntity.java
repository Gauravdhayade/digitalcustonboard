package com.technorun.digitalcustonboard.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="verification_token")
public class VerificationTokenEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private int token;
	
	private Date expiryDate;
	
	private String type;
	
	private boolean status;
	
	@ManyToOne
	@JoinColumn(name="user_profile_id",referencedColumnName = "id")
	private UserProfileEntity userProfile;
}
