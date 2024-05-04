package com.gwangholee.shoppingmall.member;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class MemberController {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/register")
    String register() {
        return "register.html";
    }

    @GetMapping("/login")
    String login() {
        return "login.html";
    }

    @GetMapping("/my-page")
    String myPage(Authentication auth) {
        if(auth.isAuthenticated()) {
            return "mypage.html";
        } else {
            return "redirect:/list";
        }
    }

    @PostMapping("/user/add")
    String add(String username, String password, String displayName) {
        Member member = new Member();
        member.setUsername(username);
        member.setPassword(passwordEncoder.encode(password));
        member.setDisplayName(displayName);
        memberRepository.save(member);
        return "redirect:/list";
    }
}
