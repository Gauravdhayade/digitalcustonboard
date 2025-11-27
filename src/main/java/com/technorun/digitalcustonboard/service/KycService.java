package com.technorun.digitalcustonboard.service;

import org.springframework.web.multipart.MultipartFile;

public interface KycService {
	String uploadDocs(Long userId, MultipartFile aadhar, MultipartFile pan, MultipartFile selfie);

	String getStatus(Long userId);
}