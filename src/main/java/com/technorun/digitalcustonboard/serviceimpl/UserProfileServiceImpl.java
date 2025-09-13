package com.technorun.digitalcustonboard.serviceimpl;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;
import com.technorun.digitalcustonboard.entity.VerificationTokenEntity;
import com.technorun.digitalcustonboard.repository.UserProfileRepository;
import com.technorun.digitalcustonboard.repository.VerificationTokenRepository;
import com.technorun.digitalcustonboard.service.UserProfileService;

@Component
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	private UserProfileRepository userProfileRepository;

	@Autowired
	private VerificationTokenRepository verificationTokenRepository;

	@Override
	public void saveUserProfileData(UserProfileEntity userProfileData) {
		if (userProfileData.getId() != 0) {
			Optional<UserProfileEntity> existingUser = userProfileRepository.findById(userProfileData.getId());
			if (existingUser.isPresent()) {
				UserProfileEntity existing = existingUser.get();
				existing.setFirstName(userProfileData.getFirstName());
				existing.setMiddleName(userProfileData.getMiddleName());
				existing.setLastName(userProfileData.getLastName());
				existing.setDob(userProfileData.getDob());
				userProfileRepository.save(existing);
				return;
			}
		}
		// If no ID provided, create new user
		userProfileRepository.save(userProfileData);
	}

	@Override
	public List<UserProfileEntity> getAllUserInfo() {
		List<UserProfileEntity> userProfileList = userProfileRepository.findAll();
		return userProfileList;
	}

	@Override
	public UserProfileEntity getUserProfileById(long id) {
		Optional<UserProfileEntity> userProfileOptional = userProfileRepository.findById(id);
		if (userProfileOptional.isPresent()) {
			return userProfileOptional.get();
		} else {
			return null;
		}

	}

	@Override
	public void updateUserProfileData(UserProfileEntity userProfileData) {
		userProfileRepository.save(userProfileData);

	}

	@Override
	public void deleteUserById(Long userId) {
		userProfileRepository.deleteById(userId);

	}

	@Override
	public String saveDocuments(Long userId, Map<String, MultipartFile> files) {
		Optional<UserProfileEntity> userProfileOptional = userProfileRepository.findById(userId);

		if (userProfileOptional.isPresent()) {
			UserProfileEntity custDetails = userProfileOptional.get();

			try {
				for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
					String documentType = entry.getKey();
					MultipartFile document = entry.getValue();

					switch (documentType) {
					case "aadharDocs":
						custDetails.setAadharDocs(document.getBytes());
						break;

					case "pancardDocs":
						custDetails.setPanCardDocs(document.getBytes());
						break;

					case "addressDocs":
						custDetails.setAddressVerificationDocs(document.getBytes());
						break;

					case "signatureDocs":
						custDetails.setSignature(document.getBytes());
						break;

					default:
						return "Invalid document type";
					}
				}

				userProfileRepository.save(custDetails);

			} catch (Exception e) {
				e.printStackTrace();
			}

		}

		return "Docs Uploaded Successfully..!";
	}

	@Override
	public String verifyAndSaveCustData(UserProfileEntity userProfileData) {

		UserProfileEntity userEmail = userProfileRepository.findByEmail(userProfileData.getEmail());
		UserProfileEntity userPhone = userProfileRepository.findByPhone(userProfileData.getPhone());
		UserProfileEntity userPanCard = userProfileRepository.findByPanCard(userProfileData.getPanCard());

		if (userEmail == null && userPhone == null && userPanCard == null) {
			UserProfileEntity userSavedData = userProfileRepository.save(userProfileData);

			String generatedOtp = generateOtp();
			System.out.println("Otp for mobile no " + userProfileData.getPhone() + " is :" + generatedOtp);

			VerificationTokenEntity verificationToken = new VerificationTokenEntity();
			verificationToken.setToken(Integer.parseInt(generatedOtp));
			verificationToken.setStatus(true);
			verificationToken.setUserProfile(userSavedData);
			verificationToken.setType("MOBILE");

			verificationTokenRepository.save(verificationToken);

		} else {
			StringBuffer str = new StringBuffer("Data alredy exists for :");
			if (userEmail != null) {
				str.append(" Email");
			}
			if (userPhone != null) {
				str.append(" Phone");
			}
			if (userPanCard != null) {
				str.append(" Pan Card");
			}
			return str.toString();
		}

		return "Data Saved Successfully";
	}

	public String generateOtp() {
		String otp = new DecimalFormat("000000").format(new Random().nextInt(999999));
		return otp;
	}

	@Override
	public boolean validateUserToken(int token, String identityData, String tokenType) {

		UserProfileEntity userData = new UserProfileEntity();
		if (tokenType.equalsIgnoreCase("mobile")) {
			userData = userProfileRepository.findByPhone(Long.valueOf(identityData));
		}
		if (tokenType.equalsIgnoreCase("email")) {
			userData = userProfileRepository.findByEmail(identityData);
		}

		// by using id i can find token against that id
		VerificationTokenEntity tokenData = verificationTokenRepository.findTokenByTypeStatusAndUserId(userData.getId(),
				tokenType);

		if (tokenData.getToken() == token) {

			if (tokenType.equalsIgnoreCase("MOBILE")) {
				userData.setPhoneVerified(true);
			}

			if (tokenType.equalsIgnoreCase("EMAIL")) {
				userData.setEmailVerified(true);
			}

			userProfileRepository.save(userData);

			tokenData.setStatus(false);
			verificationTokenRepository.save(tokenData);

			if (tokenType.equalsIgnoreCase("MOBILE")) {

				String emailToken = generateOtp();
				// send token to email id
				System.out.println("Token generate for email :" + userData.getEmail() + " is :" + emailToken);

				VerificationTokenEntity emailTokenData = new VerificationTokenEntity();
				// save token to token table
				emailTokenData.setToken(Integer.parseInt(emailToken));
				emailTokenData.setType("EMAIL");
				emailTokenData.setStatus(true);
				emailTokenData.setUserProfile(userData);
				verificationTokenRepository.save(emailTokenData);

			}
			return true;
		}

		return false;
	}

}
