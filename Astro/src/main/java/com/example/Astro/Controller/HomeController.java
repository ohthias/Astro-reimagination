package com.example.Astro.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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

    @GetMapping("/home")
    public String homePage(){
        return "home";
    }

    @GetMapping("/buscar")
    public String buscar() {
        return "buscar";
    }
}
