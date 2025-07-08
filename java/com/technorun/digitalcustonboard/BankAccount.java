package com.technorun.digitalcustonboard;

public class BankAccount {

	private double balance;

	public BankAccount() {

	}

	public BankAccount(double balance) {

		this.balance = balance;
	}

	public synchronized void deposite(double amount) {
		this.balance = this.balance + amount;
		System.out.println(
				Thread.currentThread().getName() + " deposited: " + amount + " and current balance is :" + balance);
	}

	public synchronized void withdrw(double amount) {
		this.balance = this.balance - amount;
		System.out.println(
				Thread.currentThread().getName() + " withdraw : " + amount + " and current balance is :" + balance);

	}
	
	public double getBalance() {
		return this.balance;
	}

}
