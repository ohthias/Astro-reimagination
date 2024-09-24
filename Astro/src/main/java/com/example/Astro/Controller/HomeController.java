package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {
    @Autowired
    UserRepository repository;
    User user = new User();

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

    @PostMapping("/register")
    public String insertUser(@RequestParam String username,
                             @RequestParam String email,
                             @RequestParam String hashWord) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String cliente_hashword = encoder.encode(hashWord);

        User usuario = new User(null, email, cliente_hashword, username);

        System.out.println("Username = " + username);
        System.out.println("Email = " + email);
        System.out.println("HashWord = " + cliente_hashword);

        repository.save(usuario);
        return "home";

    }

    @PostMapping("/login-user")
    public String readUser(@RequestParam String username,
                           @RequestParam String hashWord,
                           Model model) {
        try {
            User user = repository.findByUsername(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (user == null) {
                System.out.println("Cliente não encontrado");
                model.addAttribute("errorMessage", "Cliente não encontrado");
                return "login"; // Redireciona para a tela de login com mensagem de erro
            }

            boolean passwordMatch = passwordEncoder.matches(hashWord, user.getClienteHashWord());

            if (!passwordMatch) {
                System.out.println("Senha Incorreta");
                model.addAttribute("errorMessage", "Senha incorreta");
                return "login"; // Redireciona para a tela de login com mensagem de erro
            }

            return "home"; // Redireciona para a tela principal
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao processar o login");
            return "login"; // Em caso de erro, redireciona para a tela de login com mensagem de erro
        }
    }
}