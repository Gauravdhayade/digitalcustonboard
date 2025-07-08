package com.technorun.digitalcustonboard;

public class BankingMainClass {

	public static void main(String[] args) {
		
		BankAccount account = new BankAccount(5000);
		
	  Thread t1 = new Thread(new BankingThread(account,"deposite",500),"Akshay B");
	  Thread t2 = new Thread(new BankingThread(account,"withdraw",300),"Shubham L");
	  Thread t3 = new Thread(new BankingThread(account,"withdraw",1500),"Mansi G");
	  Thread t4 = new Thread(new BankingThread(account,"deposite",400),"Lakhan S");
	  
	  t1.start();
	  t2.start();
	  t3.start();
	  t4.start();
	  

	}

}
