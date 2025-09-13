package com.technorun.digitalcustonboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.technorun.digitalcustonboard.entity.VerificationTokenEntity;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationTokenEntity, Long>{

	
	@Query(value="select * from verification_token where user_profile_id = :userProfileId "
			+ "and type = :tokenType and status = 1 ",nativeQuery = true)
	public VerificationTokenEntity  findTokenByTypeStatusAndUserId(@Param("userProfileId") Long userProfileId,
			@Param("tokenType") String tokenType);
}
