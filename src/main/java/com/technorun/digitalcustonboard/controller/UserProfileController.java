package com.technorun.digitalcustonboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.service.UserProfileService;

import jakarta.annotation.Generated;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user-profile")
@Slf4j
public class UserProfileController {

	@Autowired
	private UserProfileService userProfileService;

	@PutMapping("/save-user-profile")
	public ResponseEntity<String> saveUserProfilData(@RequestBody UserProfileEntity userProfileData) {
		log.info("Inside Save User Profile Data");
		userProfileService.saveUserProfileData(userProfileData);
		return new ResponseEntity<>("User Saved Successfully..!", HttpStatus.CREATED);
	}

	@GetMapping("/user-profile-data")
	public List<UserProfileEntity> getAllUserProfile() {
		log.info("Inside get all User Profile Data");
		return userProfileService.getAllUserInfo();
	}

	@GetMapping("/user-profile-data/{id}")
	public UserProfileEntity getUserProfileById(@PathVariable long id) {
		return userProfileService.getUserProfileById(id);
	}

	@PutMapping("/update-user-profile")
	public ResponseEntity<String> updateUserProfilData(@RequestBody UserProfileEntity userProfileData) {
		log.info("Inside Update User Profile Data");
		userProfileService.updateUserProfileData(userProfileData);
		return new ResponseEntity<>("User Updated Successfully..!", HttpStatus.OK);
	}

	@DeleteMapping("/delete-user")
	public ResponseEntity<String> deleteUser(@RequestParam Long userId) {
		userProfileService.deleteUserById(userId);
		return new ResponseEntity<>("User Deleted Successfully..!", HttpStatus.OK);
	}

	@PutMapping("/file/upload")
	public ResponseEntity<String> uploadUserDocuments(@RequestParam Long userId,
			@RequestParam Map<String, MultipartFile> files) {
		userProfileService.saveDocuments(userId, files);
		return new ResponseEntity<>("User Data Upladed Successfully..!", HttpStatus.OK);

	}

	@PostMapping("/verify-user")
	public String verifyAndSaveCustData(@RequestBody UserProfileEntity userProfileData) {
		return userProfileService.verifyAndSaveCustData(userProfileData);
	}

	@PostMapping("/validate-token")
	public ResponseEntity<String> validateOtp(@RequestParam int token, @RequestParam String identityData,
			@RequestParam String tokenType) {
		boolean isValid = userProfileService.validateUserToken(token, identityData, tokenType);
		if (isValid) {
			return ResponseEntity.ok("OTP Validate Successfully");
		} else {
			return ResponseEntity.badRequest().body("Invalid OTP");
		}

	}

}
