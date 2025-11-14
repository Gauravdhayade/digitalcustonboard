package com.technorun.digitalcustonboard.service;

import com.technorun.digitalcustonboard.entity.Account;
import com.technorun.digitalcustonboard.entity.Transaction;
import java.util.List;

public interface BankingService {
    Account createAccount(Long userId, String type);
    double deposit(String accountNumber, double amount);
    double withdraw(String accountNumber, double amount);
    List<Account> getAccounts(Long userId);
    List<Transaction> getTransactions(Long userId);
}
