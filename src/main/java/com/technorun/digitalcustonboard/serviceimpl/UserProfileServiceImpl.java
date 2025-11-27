package com.technorun.digitalcustonboard.serviceimpl;

import java.util.Optional;
import java.util.UUID;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.repository.UserProfileRepository;
import com.technorun.digitalcustonboard.service.UserProfileService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

	private final UserProfileRepository userRepo;
	private final BCryptPasswordEncoder passwordEncoder;

	@Autowired
	public UserProfileServiceImpl(UserProfileRepository userRepo) {
		this.userRepo = userRepo;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@Override
	public String registerUser(UserProfileEntity user) {
		// basic validation
		if (user.getEmail() == null || user.getPassword() == null) {
			return "invalid_payload";
		}

		// email unique?
		Optional<UserProfileEntity> existing = userRepo.findByEmail(user.getEmail());
		if (existing.isPresent()) {
			return "exists_email";
		}

		// PAN unique? (if provided)
		if (user.getPan() != null && !user.getPan().isEmpty()) {
			UserProfileEntity byPan = userRepo.findByPan(user.getPan());
			if (byPan != null) {
				return "exists_pan";
			}
		}

		// hash password
		String hashed = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashed);
		user.setEmailVerified(false);

		// save
		UserProfileEntity saved = userRepo.save(user);

		// generate and return a simple message (could also return id)
		return "registered:" + saved.getId();
	}

	@Override
	public String loginAndGetToken(String email, String password) {
		Optional<UserProfileEntity> opt = userRepo.findByEmail(email);
		if (opt.isEmpty()) {
			return null;
		}
		UserProfileEntity user = opt.get();

		// verify password
		if (!passwordEncoder.matches(password, user.getPassword())) {
			return null;
		}

		// generate token (simple UUID, keep in memory / return to client)
		String token = UUID.randomUUID().toString();

		// TODO: persist token in DB in VerificationTokenEntity or use JWT
		// For now return token string
		return token;
	}

	@Override
	public UserProfileEntity getUserByEmail(String email) {
		return userRepo.findByEmail(email).orElse(null);
	}

	@Override
	public String saveDocuments(Long userId, MultipartFile aadhar, MultipartFile pancard, MultipartFile address,
			MultipartFile signature) {

		try {
			// Correct repository usage
			UserProfileEntity user = userRepo.findById(userId).orElse(null);

			if (user == null) {
				return "User not found";
			}

			if (aadhar != null && !aadhar.isEmpty()) {
				user.setAadharCardDocs(aadhar.getBytes());
			}
			if (pancard != null && !pancard.isEmpty()) {
				user.setPanCardDocs(pancard.getBytes());
			}
			if (address != null && !address.isEmpty()) {
				user.setAddressVerificationDocs(address.getBytes());
			}
			if (signature != null && !signature.isEmpty()) {
				user.setSignatureDocs(signature.getBytes());
			}

			userRepo.save(user);
			return "Documents uploaded successfully";

		} catch (Exception e) {
			return "Error uploading documents: " + e.getMessage();
		}
	}

	@Override
	public boolean validateUserTokenDummy(int token, String identityData, String tokenType) {
		// Dummy: accept 6-digit 123456 only (as used by frontend)
		return token == 123456;
	}

	@Override
	public String getKycStatus(Long userId) {
		Optional<UserProfileEntity> opt = userRepo.findById(userId);
		if (opt.isEmpty())
			return "UNKNOWN_USER";

		UserProfileEntity user = opt.get();

		// simple logic: if panCardDocs + aadharCardDocs present -> VERIFIED
		boolean aadhar = user.getAadharCardDocs() != null && user.getAadharCardDocs().length > 0;
		boolean pan = user.getPanCardDocs() != null && user.getPanCardDocs().length > 0;
		boolean addr = user.getAddressVerificationDocs() != null && user.getAddressVerificationDocs().length > 0;

		if (aadhar && pan && addr)
			return "VERIFIED";
		if (aadhar || pan || addr)
			return "PENDING";
		return "NOT_STARTED";
	}
}
