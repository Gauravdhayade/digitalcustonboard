package com.technorun.digitalcustonboard;

import java.io.Serializable;

public class TicketBookingSystem extends Thread {

	private static int availableickets = 10; // Shared Resource
	private String userName;
	private int ticketToBook;

	public TicketBookingSystem(String userName, int ticketToBook) {
		this.userName = userName;
		this.ticketToBook = ticketToBook;
	}

	@Override
	public void run() {

		bookTicket();

	}
	

	public synchronized void bookTicket() {
		System.out.println(userName + " is trying to book the ticket :" + ticketToBook);

		if (ticketToBook <= availableickets) {
			System.out.println("Booking Done for user :" + userName);
			availableickets = availableickets - ticketToBook;
			System.out.println("Available tickets are :" + availableickets);
		} else {
			System.out.println("Booking failed for :" + userName + " as not enough tickets");
		}
	}

}
