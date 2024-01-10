package com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Product {

	@Id
	@Column(name = "code")
	private String code;

	private String name;
	private String variants;
	private String description;
	private double price;
	private String retailer;
}