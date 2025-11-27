package com.technorun.digitalcustonboard.serviceimpl;

import com.technorun.digitalcustonboard.entity.KycEntity;
import com.technorun.digitalcustonboard.repository.KycRepository;
import com.technorun.digitalcustonboard.service.KycService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class KycServiceImpl implements KycService {

	private final KycRepository kycRepo;

	@Override
	public String uploadDocs(Long userId, MultipartFile aadhar, MultipartFile pan, MultipartFile selfie) {
		try {
			Path uploadDir = Paths.get("uploads");
			if (!Files.exists(uploadDir))
				Files.createDirectories(uploadDir);

			String aadharPath = uploadDir.resolve(aadhar.getOriginalFilename()).toString();
			String panPath = uploadDir.resolve(pan.getOriginalFilename()).toString();
			String selfiePath = uploadDir.resolve(selfie.getOriginalFilename()).toString();

			aadhar.transferTo(Paths.get(aadharPath));
			pan.transferTo(Paths.get(panPath));
			selfie.transferTo(Paths.get(selfiePath));

			KycEntity kyc = kycRepo.findByUserId(userId);
			if (kyc == null)
				kyc = new KycEntity();

			kyc.setUserId(userId);
			kyc.setAadharPath(aadharPath);
			kyc.setPanPath(panPath);
			kyc.setSelfiePath(selfiePath);
			kyc.setStatus("PENDING");

			kycRepo.save(kyc);

			return "KYC Documents Uploaded Successfully!";
		} catch (Exception e) {
			return "Error: " + e.getMessage();
		}
	}

	@Override
	public String getStatus(Long userId) {
		KycEntity kyc = kycRepo.findByUserId(userId);
		if (kyc == null)
			return "No KYC submitted";
		return kyc.getStatus();
	}
}