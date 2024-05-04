package com.gwangholee.shoppingmall;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class itemService {
    private final ItemRepository itemRepository;
    public void saveItem(String title, Integer price) {
        item item = new item();
        item.setTitle(title);
        item.setPrice(price);
        itemRepository.save(item);
    }
}
