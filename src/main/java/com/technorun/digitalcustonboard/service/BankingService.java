package com.technorun.digitalcustonboard.service;

import com.technorun.digitalcustonboard.entity.Account;

public interface BankingService {
    Account createAccount(Long userId, String accountType, double initialDeposit);
    Account getAccountByUser(Long userId);
}
