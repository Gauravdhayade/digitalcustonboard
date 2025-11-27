package com.technorun.digitalcustonboard.repository;

import com.technorun.digitalcustonboard.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserId(Long userId);
}
