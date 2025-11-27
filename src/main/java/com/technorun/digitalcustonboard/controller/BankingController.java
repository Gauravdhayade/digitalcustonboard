package com.technorun.digitalcustonboard.controller;

import com.technorun.digitalcustonboard.entity.Account;
import com.technorun.digitalcustonboard.service.BankingService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class BankingController {

    private final BankingService bankingService;

    // ✔ CREATE ACCOUNT
    @PostMapping("/create-account")
    public ResponseEntity<?> createAccount(
            @RequestParam Long userId,
            @RequestParam String accountType,
            @RequestParam double initialDeposit) {

        try {
            Account account = bankingService.createAccount(userId, accountType, initialDeposit);

            if (account == null) {
                return ResponseEntity.badRequest().body("Failed to create account. Try again.");
            }

            return ResponseEntity.ok(account);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Error: " + e.getMessage());
        }
    }

    // ✔ GET USER ACCOUNT DETAILS
    @GetMapping("/my-account")
    public ResponseEntity<?> getAccount(@RequestParam Long userId) {
        try {
            Account acc = bankingService.getAccountByUser(userId);

            if (acc == null) {
                return ResponseEntity.ok("NO_ACCOUNT");
            }

            return ResponseEntity.ok(acc);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Error: " + e.getMessage());
        }
    }
}
