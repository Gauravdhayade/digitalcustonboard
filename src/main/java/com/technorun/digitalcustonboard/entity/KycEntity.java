package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "kyc_details")
public class KycEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long userId;

	private String aadharPath;
	private String panPath;
	private String selfiePath;

	private String status; // PENDING, VERIFIED, REJECTED
}
