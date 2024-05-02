package com.gwangholee.shoppingmall;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<item, Long> {

}