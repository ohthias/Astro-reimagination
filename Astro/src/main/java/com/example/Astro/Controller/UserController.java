package com.example.Astro.Controller;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.Service.TokenService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;

    @Autowired
    TokenService tokenService;

    // Método para registrar o usuário e retornar o token
    @PostMapping("/register")
    ResponseEntity<Map<String, String>> registerUser(@RequestParam String username,
                                                     @RequestParam String email,
                                                     @RequestParam String hashWord) {
        // Verifique se o usuário já existe
        Optional<User> existingUser = repository.findByClienteEmail(email);
        if (existingUser.isPresent()) {
            // Retorna erro se o usuário já existe
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Usuário já existe");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Cria e salva o novo usuário
        User usuario = new User(null, email, hashWord, username);
        repository.save(usuario);

        // Gera o token
        String token = tokenService.generateToken(username, email);
        System.out.println("Token gerado: " + token);

        // Cria o response com o token
        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        // Retorna o token no corpo da resposta
        return ResponseEntity.ok(response);
    }

    // Método para buscar o usuário com base no token e retornar o nome de usuário
    @GetMapping("/home")
    public ResponseEntity<Map<String, String>> home(@RequestHeader("Authorization") String authorizationHeader) {
        // Obtém o token do header
        String token = authorizationHeader.replace("Bearer ", "");

        // Valida o token e obtém as claims
        Claims claims = tokenService.validateToken(token);
        String username = claims.getSubject();

        // Busca o usuário pelo email
        Optional<User> userOptional = repository.findByClienteEmail(claims.get("email", String.class));

        // Cria a resposta
        Map<String, String> response = new HashMap<>();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            response.put("username", user.getUsername());
        } else {
            response.put("username", "Usuário não encontrado");
        }

        // Retorna o nome do usuário
        return ResponseEntity.ok(response);
    }
}
