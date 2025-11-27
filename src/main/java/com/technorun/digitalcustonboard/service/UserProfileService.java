package com.technorun.digitalcustonboard.service;

import org.springframework.web.multipart.MultipartFile;
import com.technorun.digitalcustonboard.entity.UserProfileEntity;

public interface UserProfileService {
	String registerUser(UserProfileEntity user);

	String loginAndGetToken(String email, String password);

	UserProfileEntity getUserByEmail(String email);

	// ADD THIS
	String saveDocuments(Long userId, MultipartFile aadhar, MultipartFile pancard, MultipartFile address,
			MultipartFile signature);

	boolean validateUserTokenDummy(int token, String identityData, String tokenType);

	String getKycStatus(Long userId);
}
