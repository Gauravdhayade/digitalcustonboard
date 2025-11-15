package com.technorun.digitalcustonboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "user_profile")
public class UserProfileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long userId;

	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String password;
	private String phone;
	private String pan;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

	private boolean emailVerified = false;

	@Lob
	private byte[] aadharCardDocs;

	@Lob
	private byte[] panCardDocs;

	@Lob
	private byte[] profilePhoto;

	@Lob
	private byte[] addressVerificationDocs;

	@Lob
	private byte[] signatureDocs;

	@OneToOne
	@JoinColumn(name = "user_details_id")
	private UserDetailsEntity userDetails;
}
