package com.technorun.digitalcustonboard.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class Mobile {

	private String mobileName;
	
	@Autowired
	private Charger charger;
	
	//constructor injection
	@Autowired
	public Mobile(Charger charger) {
		this.charger= charger;
	}
	
	@Autowired
	public void setCharger(Charger charger) {
		this.charger = charger;
	}
	

	public void chargeYourMobile(String mobileName) {
		charger.chargeMobile(mobileName);
		
	}
	
}
