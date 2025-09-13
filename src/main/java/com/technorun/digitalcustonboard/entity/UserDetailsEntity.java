package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user_details")
public class UserDetailsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="username",nullable = false, length = 350, unique = true)
	private String userName;  
	
	@Column(nullable = false, length = 300)
	private String password;
	
	
	private boolean isEnabled;
	
	@OneToOne(mappedBy = "userDetails")
	private UserProfileEntity userProfile;
	
	
}
