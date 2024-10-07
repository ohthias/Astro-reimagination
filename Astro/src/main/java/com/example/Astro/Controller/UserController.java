package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users") // Define a base da URL para os endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Método para adicionar um novo usuário
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user); // Salva o usuário no banco de dados e retorna o objeto salvo
    }

    // Método para obter todos os usuários
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Retorna a lista de todos os usuários
    }

    // Método para obter um usuário por ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
