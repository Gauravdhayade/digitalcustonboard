package com.technorun.digitalcustonboard.dto;

import org.hibernate.annotations.Comments;
import org.springframework.stereotype.Component;

@Component
public class Charger {

	
	public void chargeMobile(String mobileName) {
		System.out.println(mobileName+" charging started");
	}
}
