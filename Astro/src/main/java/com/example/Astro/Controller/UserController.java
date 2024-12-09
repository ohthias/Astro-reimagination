package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users") // Define a base da URL para os endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Método para deletar um usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Método para obter um usuário por username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Método para buscar o token do usuário pelo username
    @PostMapping
    public ResponseEntity<?> getTokenByUsername(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body("Username é obrigatório.");
        }

        try {
            User user = userService.getUserByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
            }

            return ResponseEntity.ok(Map.of("token", user.getToken()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno.");
        }
    }

    // Método para adicionar um novo usuário
    @PostMapping("/add")
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
