package com.technorun.digitalcustonboard.controller;

import com.technorun.digitalcustonboard.service.KycService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/kyc")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class KycController {

	private final KycService kycService;

	// ✅ Upload KYC Docs
	@PostMapping("/upload")
	public ResponseEntity<?> uploadKycDocs(@RequestParam("userId") Long userId,
			@RequestParam("aadhar") MultipartFile aadhar, @RequestParam("pan") MultipartFile pan,
			@RequestParam("signature") MultipartFile signature) {

		String response = kycService.uploadDocs(userId, aadhar, pan, signature);
		return ResponseEntity.ok(response);
	}

	// ✅ Get KYC Status (Path Variable)
	@GetMapping("/status/{userId}")
	public ResponseEntity<?> getKycStatus(@PathVariable Long userId) {
		String status = kycService.getStatus(userId);
		return ResponseEntity.ok(status);
	}

	// ✅ Get KYC Status (RequestParam Version)
	@GetMapping("/kyc-status")
	public ResponseEntity<?> getStatusViaParam(@RequestParam Long userId) {
		String status = kycService.getStatus(userId);
		return ResponseEntity.ok(status);
	}
}
