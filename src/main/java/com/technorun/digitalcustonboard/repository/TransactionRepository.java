package com.technorun.digitalcustonboard.repository;

import com.technorun.digitalcustonboard.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Correct derived query when Account has field 'userId' (Long userId)
    List<Transaction> findByAccountUserId(Long userId);
}
