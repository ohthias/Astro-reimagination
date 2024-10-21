package com.example.Astro.Controller;

/*
    Autor: Kaique Magalhães Santos
    Projeto: Astro
    Data: 24.09.2024
 */

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.service.TokenService;
import com.example.Astro.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Optional;

import java.security.Principal;
import java.time.LocalDate;

@Controller
public class HomeController {
    @Autowired
    UserRepository repository;
    User user = new User();
    @Autowired
    TokenService tokenService;
    @Autowired
    UserService userService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/plano")
    public String plano(){
        return "plano";
    }

    @GetMapping("/sign")
    public String sign(){
        return "sign";
    }

    @GetMapping("/home")
    public String home(@RequestParam("token") String token, Model model) {
        // Busca o usuário usando o token
        User user = userService.getUserByToken(token);

        if (user != null) {
            model.addAttribute("username", user.getUsername()); // Adiciona o nome do usuário ao modelo
        } else {
            model.addAttribute("error", "Usuário não encontrado");
        }

        return "home"; // Nome da página HTML que será exibida
    }

    @GetMapping("/artist")
    public String artist() { return  "artist";}

    @GetMapping("/playlist")
    public  String playlist() {return "playlist";}

    @GetMapping("/album")
    public  String album() {return "album";}

    @GetMapping("/busca")
    public  String busca() {return "busca";}

    @GetMapping("/user")
    public String userProfile(@RequestParam("token") String token, Model model) {
        try {
            Claims claims = tokenService.validateToken(token);
            String username = claims.getSubject();
            User user = repository.findByUsername(username);

            // Verificar se o usuário é nulo
            if (user == null) {
                model.addAttribute("errorMessage", "Usuário não encontrado");
                return "error"; // Retorna uma página de erro
            }

            // Se o usuário for encontrado, adiciona-o ao modelo
            model.addAttribute("user", user);
            return "user"; // Retorna a página user.html
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao processar o perfil do usuário");
            return "error"; // Retorna uma página de erro
        }
    }

    @GetMapping("/single/{id}")
    public String single(@PathVariable("id") String id, @RequestParam("token") String token, Model model) {
        model.addAttribute("token", token);
        return "single";
    }

    @GetMapping("/artist/{id}")
    public String getArtistDetails(@PathVariable("id") String artistId, @RequestParam("token") String token, Model model) {
        String spotifyApiUrl = "https://api.spotify.com/v1/artists/" + artistId;
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(spotifyApiUrl, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String artistDetailsJson = response.getBody();
                model.addAttribute("artistDetails", artistDetailsJson);
                return "artist";
            } else {
                model.addAttribute("errorMessage", "Não foi possível buscar os detalhes do artista");
                return "error";
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao buscar os detalhes do artista");
            return "error";
        }
    }

    @PostMapping("/register")
    public String insertUser(@RequestParam String username,
                             @RequestParam String email,
                             @RequestParam String hashWord) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String clienteHashword = encoder.encode(hashWord);
        String token = tokenService.generateToken(username, email);

        LocalDate currentDate = LocalDate.now();

        User usuario = new User(null, email, clienteHashword, username, currentDate, token);
        repository.save(usuario);
        return "redirect:/home?token=" + token;
    }

    @PostMapping("/login-user")
    public String readUser(@RequestParam String username,
                           @RequestParam String hashWord,
                           Model model) {
        try {
            User user = repository.findByUsername(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (user == null) {
                model.addAttribute("errorMessage", "Cliente não encontrado");
                return "login";
            }

            boolean passwordMatch = passwordEncoder.matches(hashWord, user.getPassword());

            if (!passwordMatch) {
                model.addAttribute("errorMessage", "Senha incorreta");
                return "login";
            }

            user.setLastAccess(LocalDate.now());
            repository.save(user);

            // Gerar token e redirecionar com o token na URL
            String token = tokenService.generateToken(username, user.getEmail());

            return "redirect:/home?token=" + token;
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao processar o login");
            return "login";
        }
    }

    // Endpoint para logout (remove o token e redireciona)
    @GetMapping("/logout")
    public String logout() {
        // O token é removido no frontend (no JavaScript), aqui só redirecionamos para a tela de login.
        return "redirect:/login";
    }

}
