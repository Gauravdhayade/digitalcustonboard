package com.technorun.digitalcustonboard.repository;

import com.technorun.digitalcustonboard.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByAccount_User_UserId(Long userId);

}
