package com.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Orders {

	@Id
	@Column(name = "orderNumber")
	private Long orderNumber;

	private LocalDate orderDate;
	private double totalAmount;

	@ManyToOne
	@JoinColumn(name = "customerID")
	private Customer customer;

	@OneToMany(mappedBy = "order")
	private List<OrderLineItem> orderLineItems;
}
