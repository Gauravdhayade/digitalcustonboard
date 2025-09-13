package com.technorun.digitalcustonboard.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
	private long id;
	private String firstName;
	private String lastName;
	private String email;
	private long phone;
	private String panCard;
	private Date dob;
}