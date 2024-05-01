package com.gwangholee.shoppingmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShoppingmallApplication {
	public static void main(String[] args) {
		SpringApplication.run(ShoppingmallApplication.class, args);
		String name = "gwangho";
		int age = 22;
		System.out.println(name);
		System.out.println(age);
	}
}