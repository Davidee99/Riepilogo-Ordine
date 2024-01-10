package com.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data

@NoArgsConstructor
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String firstname;
	private String lastname;
	private int age;
	private String email;
	private String phone;
	private String locale;

	@ManyToOne
	@JoinColumn(name = "billingAddress")
	private Address billingAddress;

	@ManyToOne
	@JoinColumn(name = "shippingAddress")
	private Address shippingAddress;

	@OneToMany(mappedBy = "customer")
	private List<Orders> orders;
}