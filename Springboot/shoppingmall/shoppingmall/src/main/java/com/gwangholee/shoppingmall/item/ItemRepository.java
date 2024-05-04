package com.gwangholee.shoppingmall.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<item, Long> {
    Page<item> findPageBy(Pageable page);
}