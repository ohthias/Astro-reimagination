package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ThemeController {

    @Autowired
    private UserService userService; // Serviço para gerenciar usuários
    @Autowired
    private UserRepository repository;

    @PostMapping("/save-theme")
    public ResponseEntity<String> saveTheme(@RequestBody Map<String, String> request, @RequestHeader("Authorization") String token) {
        String theme = request.get("theme");

        if (theme == null || theme.isEmpty()) {
            return ResponseEntity.badRequest().body("Tema não fornecido.");
        }

        // Remove o prefixo "Bearer " do token
        token = token.replace("Bearer ", "");
        System.out.println("token: \n" +token);

        // Busca o usuário pelo token
        User user = userService.getUserByToken(token);
        if (user == null) {
            System.out.println("\nUsuário não encontrado\n");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
        }

        // Atualiza o tema no banco de dados
        user.setTheme(theme); // Supondo que você tenha um campo `theme` na entidade `User`
        repository.save(user); // Salva o usuário atualizado no banco de dados

        return ResponseEntity.ok("Tema salvo com sucesso!");
    }
}