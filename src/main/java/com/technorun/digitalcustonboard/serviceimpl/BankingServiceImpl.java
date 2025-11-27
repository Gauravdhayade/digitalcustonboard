package com.technorun.digitalcustonboard.serviceimpl;

import com.technorun.digitalcustonboard.entity.Account;
import com.technorun.digitalcustonboard.repository.AccountRepository;
import com.technorun.digitalcustonboard.service.BankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class BankingServiceImpl implements BankingService {

    private final AccountRepository accountRepository;

    @Override
    public Account createAccount(Long userId, String accountType, double initialDeposit) {

        // If account already exists
        Account existing = accountRepository.findByUserId(userId);
        if (existing != null) return existing;

        Account acc = new Account();
        acc.setUserId(userId);
        acc.setAccountType(accountType);
        acc.setBalance(initialDeposit);

        // Generate unique account number
        acc.setAccountNumber("DG" + (10000000 + new Random().nextInt(90000000)));

        return accountRepository.save(acc);
    }

    @Override
    public Account getAccountByUser(Long userId) {
        return accountRepository.findByUserId(userId);
    }
}
