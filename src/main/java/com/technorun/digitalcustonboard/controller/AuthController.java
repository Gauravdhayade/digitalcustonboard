package com.technorun.digitalcustonboard.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.repository.UserProfileRepository;
import com.technorun.digitalcustonboard.service.UserProfileService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private UserProfileService userService;

	@Autowired
	private UserProfileRepository userProfileRepository;

	// ✅ REGISTER
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserProfileEntity user) {
		String res = userService.registerUser(user);
		if (res.contains("exists")) {
			return ResponseEntity.status(409).body(res);
		}
		return ResponseEntity.status(201).body(res);
	}

	// ✅ LOGIN
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest req) {
		String token = userService.loginAndGetToken(req.getEmail(), req.getPassword());
		if (token == null) {
			return ResponseEntity.status(401).body("Invalid credentials");
		}

		// ✅ login नंतर userId आणि name पण पाठवा — React ला वापरता येईल
		UserProfileEntity user = userService.getUserByEmail(req.getEmail());

		LoginResponse response = new LoginResponse("Login successful", token, user.getUserId(), user.getFirstName(),
				user.getLastName(), user.getEmail());

		return ResponseEntity.ok(response);
	}

	// ✅ VERIFY OTP (Dummy)
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
		String otp = req.get("otp");
		if ("123456".equals(otp)) {
			return ResponseEntity.ok("OTP verified successfully");
		} else {
			return ResponseEntity.status(400).body("Invalid OTP");
		}
	}

	// ✅ UPLOAD DOCUMENTS
	@PostMapping("/upload-docs")
	public ResponseEntity<String> uploadDocs(@RequestParam("userId") Long userId,
			@RequestParam("aadhar") MultipartFile aadhar, @RequestParam("pancard") MultipartFile pancard,
			@RequestParam("address") MultipartFile address, @RequestParam("signature") MultipartFile signature) {

		try {
			String res = userService.saveDocuments(userId, aadhar, pancard, address, signature);
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Error uploading documents: " + e.getMessage());
		}
	}

	// ✅ DASHBOARD (By Email)
	@GetMapping("/dashboard-by-email")
	public ResponseEntity<?> getDashboardByEmail(@RequestParam String email) {
		try {
			UserProfileEntity user = userService.getUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(404).body("User not found");
			}
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error fetching dashboard: " + e.getMessage());
		}
	}

	@PostMapping("/upload-profile-photo")
	public ResponseEntity<String> uploadProfilePhoto(
	        @RequestParam("userId") Long userId,
	        @RequestParam("profilePhoto") MultipartFile photo) {

	    try {
	        UserProfileEntity user = userProfileRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setProfilePhoto(photo.getBytes());
	        userProfileRepository.save(user);

	        return ResponseEntity.ok("Profile photo updated successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Error: " + e.getMessage());
	    }
	}


	// ✅ Extra class for login request
	public static class LoginRequest {
		private String email;
		private String password;

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

	// ✅ Login response for frontend
	public static class LoginResponse {
		private String message;
		private String token;
		private Long userId;
		private String firstName;
		private String lastName;
		private String email;

		public LoginResponse(String message, String token, Long userId, String firstName, String lastName,
				String email) {
			this.message = message;
			this.token = token;
			this.userId = userId;
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
		}

		public String getMessage() {
			return message;
		}

		public String getToken() {
			return token;
		}

		public Long getUserId() {
			return userId;
		}

		public String getFirstName() {
			return firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public String getEmail() {
			return email;
		}
	}
}
