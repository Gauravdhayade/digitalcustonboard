package com.technorun.digitalcustonboard;

public class BankingThread implements Runnable {

	private BankAccount account;
	private String operation;
	private double amount;

	public BankingThread(BankAccount account, String operation, double amount) {
		super();
		this.account = account;
		this.operation = operation;
		this.amount = amount;
	}

	@Override
	public void run() {
		performAction();
	}

	public void performAction() {
		switch (operation) {
		case "deposite":
			account.deposite(amount);
			break;
		case "withdraw":
			account.withdrw(amount);
			break;
		default:
			System.out.println(Thread.currentThread().getName() + " performed invalid operation");
		}
	}

}
