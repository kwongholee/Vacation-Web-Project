package com.gwangholee.shoppingmall;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    public String title;
    public String date;
}