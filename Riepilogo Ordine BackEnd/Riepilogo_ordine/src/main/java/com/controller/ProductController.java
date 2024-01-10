package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Product;
import com.service.ProductService;

@RestController
@RequestMapping("/api/ProductController")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping("/getAll")
	public ResponseEntity<?> getAll() {

		List<Product> list = productService.getAllProducts();

		return new ResponseEntity<>(list, HttpStatus.OK);

	}

}
