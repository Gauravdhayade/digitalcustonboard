package com.technorun.digitalcustonboard.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.technorun.digitalcustonboard.entity.UserProfileEntity;

@Service
public interface UserProfileService {
	
	public void saveUserProfileData(UserProfileEntity userProfileData);
	
	public List<UserProfileEntity> getAllUserInfo();
	
	public UserProfileEntity getUserProfileById(long id);

	public void updateUserProfileData(UserProfileEntity userProfileData);
	
	public void deleteUserById(Long userId);
	
	public String saveDocuments(Long userId,  Map<String, MultipartFile> files);
	
	public String verifyAndSaveCustData(UserProfileEntity userProfileData);
	
	public boolean validateUserToken( int token,String identityData,String tokenType) ;
	
	




}
