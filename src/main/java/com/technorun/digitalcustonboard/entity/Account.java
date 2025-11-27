package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bank_accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(unique = true)
    private String accountNumber;

    private String accountType;     // SAVINGS / CURRENT
    private double balance;          // initial deposit
    private String ifscCode = "DIGI0001234";

    private String status = "ACTIVE";  // ACTIVE / CLOSED
}
