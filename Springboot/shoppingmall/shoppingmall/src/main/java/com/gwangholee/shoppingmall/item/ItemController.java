package com.gwangholee.shoppingmall.item;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ItemController {
    private final ItemRepository itemRepository;
    private final com.gwangholee.shoppingmall.item.itemService itemService;
    private final S3Service s3Service;

    @GetMapping("/list")
    String list(Model model) {
        List<item> result = itemRepository.findAll();
        model.addAttribute("items", result);
        return "list.html";
    }

    @GetMapping("/write")
    String write() {
        return "write.html";
    }

    @PostMapping("/add")
    String add(String title, int price) {
        itemService.saveItem(title, price);
        return "redirect:/list";
    }

    @GetMapping("/detail/{id}")
    String detail(@PathVariable Long id, Model model) {
        var result = itemRepository.findById(id);
        if(result.isPresent()) {
            model.addAttribute("item", result.get());
            return "detail.html";
        } else {
            return "redirect:/list";
        }
    }

    @GetMapping("/edit/{id}")
    String edit(@PathVariable Long id, Model model) {
        var result = itemRepository.findById(id);
        if(result.isPresent()) {
            model.addAttribute("item", result.get());
            return "edit.html";
        } else {
            return "redirect:/list";
        }
    }

    @PostMapping("/edit")
    String Edit(Long id, String title, Integer price) {
        item Item = new item();
        Item.setId(id);
        Item.setTitle(title);
        Item.setPrice(price);
        itemRepository.save(Item);
        return "redirect:/list";
    }

    @DeleteMapping("/item")
    String delete(@RequestParam Long id) {
        itemRepository.deleteById(id);
        return "redirect:/list";
    }

    @GetMapping("/list/page/{id}")
    String list2(@PathVariable Integer id, Model model) {
        Page<item> result = itemRepository.findPageBy(PageRequest.of(id-1, 5));
        var pages = result.getTotalPages();
        model.addAttribute("items", result);
        return "list.html";
    }

    @GetMapping("/presigned-url")
    @ResponseBody
    String getURL(@RequestParam String filename) {
        var result = s3Service.createPreSignedUrl("test/" + filename);
        return result;
    }
}