package com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Address {

	@Id
	@Column(name = "postalCode")
	private String postalCode;

	private String street;
	private String city;
	private String state;
}