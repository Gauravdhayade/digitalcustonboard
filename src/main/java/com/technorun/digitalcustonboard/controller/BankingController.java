package com.technorun.digitalcustonboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.technorun.digitalcustonboard.entity.Account;
import com.technorun.digitalcustonboard.service.BankingService;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "http://localhost:3000")
public class BankingController {
    @Autowired
    private BankingService bankingService;

    @PostMapping("/create-account")
    public ResponseEntity<?> createAccount(@RequestParam Long userId, @RequestParam String type) {
        Account a = bankingService.createAccount(userId, type);
        return ResponseEntity.ok(a);
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestParam String accountNumber, @RequestParam double amount) {
        return ResponseEntity.ok(bankingService.deposit(accountNumber, amount));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestParam String accountNumber, @RequestParam double amount) {
        return ResponseEntity.ok(bankingService.withdraw(accountNumber, amount));
    }

    @GetMapping("/transactions/{accountId}")
    public ResponseEntity<?> transactions(@PathVariable Long accountId) {
        return ResponseEntity.ok(bankingService.getTransactions(accountId));
    }
}
