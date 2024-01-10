package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.OrderLineItem;

public interface OrderLineItemRepository extends JpaRepository<OrderLineItem, Long> {

}
