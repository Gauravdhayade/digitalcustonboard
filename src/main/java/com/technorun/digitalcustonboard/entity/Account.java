package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private String accountType;
    private double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfileEntity user;
}
