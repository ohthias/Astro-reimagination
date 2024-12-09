package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users") // Define a base da URL para os endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private UserService userService;

    public void UserDetailsController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

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
