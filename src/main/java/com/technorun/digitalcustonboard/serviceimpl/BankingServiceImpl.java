package com.technorun.digitalcustonboard.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.technorun.digitalcustonboard.entity.*;
import com.technorun.digitalcustonboard.repository.*;
import com.technorun.digitalcustonboard.service.BankingService;
import java.util.*;

@Service
public class BankingServiceImpl implements BankingService {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private UserProfileRepository userProfileRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	private String generateAccountNumber() {
		Random r = new Random();
		StringBuilder sb = new StringBuilder("ACC");
		for (int i = 0; i < 9; i++)
			sb.append(r.nextInt(10));
		return sb.toString();
	}

	@Override
	public Account createAccount(Long userId, String type) {
		UserProfileEntity user = userProfileRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));

		Account acc = new Account();
		acc.setAccountNumber(generateAccountNumber());
		acc.setAccountType(type);
		acc.setBalance(0.0);
		acc.setUser(user);
		return accountRepository.save(acc);
	}

	@Override
	public double deposit(String accountNumber, double amount) {
		Account acc = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new RuntimeException("Account not found"));
		acc.setBalance(acc.getBalance() + amount);
		accountRepository.save(acc);

		Transaction txn = new Transaction();
		txn.setType("DEPOSIT");
		txn.setAmount(amount);
		txn.setAccount(acc);
		txn.setTimestamp(java.time.LocalDateTime.now());
		transactionRepository.save(txn);

		return acc.getBalance();
	}

	@Override
	public double withdraw(String accountNumber, double amount) {
		Account acc = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new RuntimeException("Account not found"));
		if (acc.getBalance() < amount) {
			throw new RuntimeException("Insufficient funds");
		}
		acc.setBalance(acc.getBalance() - amount);
		accountRepository.save(acc);

		Transaction txn = new Transaction();
		txn.setType("WITHDRAW");
		txn.setAmount(amount);
		txn.setAccount(acc);
		txn.setTimestamp(java.time.LocalDateTime.now());
		transactionRepository.save(txn);

		return acc.getBalance();
	}

	@Override
	public List<Account> getAccounts(Long userId) {
		return accountRepository.findByUser_UserId(userId);

	}

	@Override
	public List<Transaction> getTransactions(Long userId) {
		return transactionRepository.findByAccount_User_Id(userId);
	}
}
