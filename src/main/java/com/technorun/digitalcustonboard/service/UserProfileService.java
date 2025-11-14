package com.technorun.digitalcustonboard.service;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserProfileService {

	String registerUser(UserProfileEntity user);

	String loginAndGetToken(String email, String password);

	boolean validateUserTokenDummy(int token, String identityData, String tokenType);

	UserProfileEntity getUserById(Long id);

	UserProfileEntity getUserByEmail(String email);

	String saveDocuments(Long userId, MultipartFile aadhar, MultipartFile pancard, MultipartFile address,
			MultipartFile signature);
}
