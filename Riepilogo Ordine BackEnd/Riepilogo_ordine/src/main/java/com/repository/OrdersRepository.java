package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

}
