package com.technorun.digitalcustonboard.serviceimpl;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.repository.UserProfileRepository;
import com.technorun.digitalcustonboard.service.UserProfileService;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserProfileRepository userProfileRepository;

	@Override
	public UserProfileEntity getUserByEmail(String email) {
		return userProfileRepository.findByEmail(email);
	}

	@Override
	public String registerUser(UserProfileEntity user) {
		try {
			// Check if user already exists
			if (userProfileRepository.findByEmail(user.getEmail()) != null) {
				return "User already exists";
			}

			// Save user
			userProfileRepository.save(user);
			return "User registered successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error: " + e.getMessage();
		}

	}

	@Override
	public String loginAndGetToken(String email, String password) {

		UserProfileEntity user = userProfileRepository.findByEmail(email);
		if (user == null) {
			return null; // frontend => Invalid Email
		}

		boolean match = (passwordEncoder != null) ? passwordEncoder.matches(password, user.getPassword())
				: password.equals(user.getPassword());

		if (!match) {
			return null; // frontend => Invalid Password
		}

		// 🔥 Generate simple token (demo purpose)
		String token = email + "_TOKEN_" + System.currentTimeMillis();

		return token;
	}

	@Override
	public boolean validateUserTokenDummy(int token, String identityData, String tokenType) {
		UserProfileEntity user = userProfileRepository.findByEmail(identityData);
		if (user == null)
			return false;
		user.setEmailVerified(true);
		userProfileRepository.save(user);
		return true;
	}

	@Override
	public UserProfileEntity getUserById(Long id) {
		return userProfileRepository.findById(id).orElse(null);
	}

	@Override
	public String saveDocuments(Long userId, MultipartFile aadhar, MultipartFile pancard, MultipartFile address,
			MultipartFile signature) {
		try {
			UserProfileEntity user = userProfileRepository.findById(userId)
					.orElseThrow(() -> new RuntimeException("User not found"));

			user.setAadharCardDocs(aadhar.getBytes());
			user.setPanCardDocs(pancard.getBytes());
			user.setAddressVerificationDocs(address.getBytes());
			user.setSignatureDocs(signature.getBytes());

			userProfileRepository.save(user);
			return "Documents uploaded successfully!";
		} catch (IOException e) {
			e.printStackTrace();
			return "Failed to upload documents: " + e.getMessage();
		} catch (Exception e) {
			e.printStackTrace();
			return "Unexpected error: " + e.getMessage();
		}
	}
}
