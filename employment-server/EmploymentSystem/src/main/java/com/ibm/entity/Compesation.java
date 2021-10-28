package com.ibm.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class Compesation {

	@Field(name = "compesation_type")
	private String type;
	@Field(name = "compesation_amount")
	private double amount;
	@Field(name = "compesation_description")
	private String description;
	@Field(name = "compesation_year")
	private int year;
	@Field(name = "compesation_month")
	private int month;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

}
