package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions") // change here
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String type;
	private double amount;
	private LocalDateTime timestamp;

	@ManyToOne
	@JoinColumn(name = "account_id")
	private Account account;
}
