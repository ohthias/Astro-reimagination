package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/sign")
    public String sign(){
        return "sign";
    }

    @Autowired
    UserRepository repository;


    @PostMapping("/register")
    public String InsertUser(@RequestParam String username,
                             @RequestParam String email,
                             @RequestParam String hashWord) {

        User usuario = new User(null, email, hashWord, username);

        System.out.println("Username = " + username);
        System.out.println("Email = " + email);
        System.out.println("HashWord = " + hashWord);

        repository.save(usuario);
        return "index";

    }

}


