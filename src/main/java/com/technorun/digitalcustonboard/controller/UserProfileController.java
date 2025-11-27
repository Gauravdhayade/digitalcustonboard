package com.technorun.digitalcustonboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.service.UserProfileService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

	@Autowired
	private UserProfileService userProfileService;

	// ⭐ REGISTER USER (CORRECT NAME + JSON BODY)
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserProfileEntity user) {
		String res = userProfileService.registerUser(user);

		return switch (res) {
		case "exists_email" -> ResponseEntity.status(409).body("Email already exists");
		case "exists_pan" -> ResponseEntity.status(409).body("PAN already exists");
		case "invalid_payload" -> ResponseEntity.badRequest().body("Missing fields");
		default -> ResponseEntity.ok("Registered Successfully. User ID: " + res);
		};
	}

	// ⭐ LOGIN USER (JSON BODY)
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {

		String token = userProfileService.loginAndGetToken(request.getEmail(), request.getPassword());

		if (token == null) {
			return ResponseEntity.status(401).body("Invalid Credentials");
		}

		return ResponseEntity.ok(new LoginResponse("Login Successful", token));
	}

	// ⭐ UPLOAD DOCUMENTS
	@PostMapping("/upload-docs")
	public ResponseEntity<?> uploadDocs(@RequestParam Long userId, @RequestParam("aadhar") MultipartFile aadhar,
			@RequestParam("pancard") MultipartFile pancard, @RequestParam("address") MultipartFile address,
			@RequestParam("signature") MultipartFile signature) {

		String res = userProfileService.saveDocuments(userId, aadhar, pancard, address, signature);
		return ResponseEntity.ok(res);
	}

	// ⭐ OTP VERIFY (Dummy)
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest req) {

		boolean valid = userProfileService.validateUserTokenDummy(req.getToken(), req.getIdentityData(),
				req.getTokenType());

		return valid ? ResponseEntity.ok("OTP Verified Successfully") : ResponseEntity.status(400).body("Invalid OTP");
	}

	// ⭐ KYC STATUS
	@GetMapping("/kyc-status")
	public ResponseEntity<?> getKycStatus(@RequestParam Long userId) {
		String status = userProfileService.getKycStatus(userId);
		return ResponseEntity.ok(status);
	}

	// ============================================
	// ✔ DTO CLASSES
	// ============================================

	public static class LoginRequest {
		private String email;
		private String password;

		// Getters & Setters
		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

	public static class LoginResponse {
		private String message;
		private String token;

		public LoginResponse(String message, String token) {
			this.message = message;
			this.token = token;
		}

		public String getMessage() {
			return message;
		}

		public String getToken() {
			return token;
		}
	}

	public static class OtpRequest {
		private int token;
		private String identityData;
		private String tokenType;

		public int getToken() {
			return token;
		}

		public String getIdentityData() {
			return identityData;
		}

		public String getTokenType() {
			return tokenType;
		}
	}
}
