package com.technorun.digitalcustonboard.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.service.UserProfileService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user-profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

	@Autowired
	private UserProfileService userProfileService;

	// ✅ Register API
	@PostMapping("/verify-user")
	public ResponseEntity<?> registerUser(@RequestBody UserProfileEntity user) {
		String res = userProfileService.registerUser(user);
		return ResponseEntity.ok(res);
	}

	// ✅ Login API
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
		String token = userProfileService.loginAndGetToken(email, password);
		return ResponseEntity.ok(token);
	}

	// ✅ File upload
	@PostMapping("/upload-docs")
	public ResponseEntity<?> uploadDocs(@RequestParam Long userId, @RequestParam("aadharDocs") MultipartFile aadhar,
			@RequestParam("pancardDocs") MultipartFile pancard, @RequestParam("addressDocs") MultipartFile address,
			@RequestParam("signatureDocs") MultipartFile signature) {
		String res = userProfileService.saveDocuments(userId, aadhar, pancard, address, signature);
		return ResponseEntity.ok(res);
	}

	// ✅ OTP Verification
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestParam int token, @RequestParam String identityData,
			@RequestParam String tokenType) {
		boolean valid = userProfileService.validateUserTokenDummy(token, identityData, tokenType);
		return valid ? ResponseEntity.ok("OTP Validated (dummy)") : ResponseEntity.badRequest().body("Invalid OTP");
	}
}
