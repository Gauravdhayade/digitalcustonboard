package com.technorun.digitalcustonboard;

public class MainClass {

	public static void main(String[] args) {
		
		TicketBookingSystem user1 = new TicketBookingSystem("User1",3);   //new 
		TicketBookingSystem user2 = new TicketBookingSystem("User2",4);  
		TicketBookingSystem user3 = new TicketBookingSystem("User3",5);  
		
		user1.start();     //runnable
		user2.start();
		user3.start();
		

	}

}
