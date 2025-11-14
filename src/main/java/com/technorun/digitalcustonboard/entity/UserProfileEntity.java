package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_profile")
public class UserProfileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String password;
	private String phone;
	private String pan;
	private String dob;
	private boolean emailVerified = false;

	@Lob
	private byte[] aadharCardDocs;

	@Lob
	private byte[] panCardDocs;

	@Lob
	private byte[] addressVerificationDocs;

	@Lob
	private byte[] signatureDocs;

	@OneToOne
	@JoinColumn(name = "user_details_id") // foreign key column
	private UserDetailsEntity userDetails;

	// Getters and setters
}