package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_details")
public class UserDetailsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;
	private String role;

	@OneToOne(mappedBy = "userDetails", cascade = CascadeType.ALL)
	private UserProfileEntity userProfile;
}
