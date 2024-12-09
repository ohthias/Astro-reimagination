package com.example.Astro.Controller;

/*
    Autor: Kaique Magalhães Santos
    Projeto: Astro
    Data: 24.09.2024
 */

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.example.Astro.service.TokenService;
import com.example.Astro.service.UserService;

import io.jsonwebtoken.Claims;

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

    @GetMapping("/pagamento")
    public String pagamento(){
        return "pagamento";
    }

    @GetMapping("/plano")
    public String plano(){
        return "plano";
    }

    @GetMapping("/sign")
    public String sign(){
        return "sign";
    }

    @GetMapping("/astro")
    public String home(@RequestParam("token") String token, Model model) {
        // Busca o usuário usando o token
        User user = userService.getUserByToken(token);

        if (user != null) {
            model.addAttribute("username", user.getUsername()); // Adiciona o nome do usuário ao modelo
        } else {
            model.addAttribute("error", "Usuário não encontrado");
        }
        return "astro"; // Nome da página HTML que será exibida
    }

    @GetMapping("/{page}")
    public ResponseEntity<Map<String, String>> getContent(@PathVariable String page) {
        Map<String, String> content = new HashMap<>();

        // Define o conteúdo de cada página
        switch (page) {
            case "home":
            case "busca":
            case "album":
            case "artist":
            case "playlist":
            case "user":
            default:
                content.put("title", "Erro");
                content.put("body", "Conteúdo não encontrado.");
        }

        // Retorna o conteúdo como JSON
        return ResponseEntity.ok(content);
    }

    @GetMapping("/setting")
    public String setting() {return "setting";}

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
                             @RequestParam String hashWord,
                             Model model) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String clienteHashword = encoder.encode(hashWord);
        User userExist = repository.findByUsername(username);
        User emailExist = repository.findByEmail(email);

        if (userExist != null) {
            model.addAttribute("errorMessage", "Esse usuário já está sendo usado");
            return "sign";
        }

        if (emailExist != null) {
            model.addAttribute("errorMessage", "Esse email já está sendo usado por um usuário");
            return "sign";
        }

        String token = tokenService.generateToken(username, email);

        // Obter a data e hora atual no fuso horário de Brasília
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));

        // Converter ZonedDateTime para Date
        Date date = Date.from(now.toInstant());

        User usuario = new User(null, email, clienteHashword, username, date , token, "defaultTheme");
        repository.save(usuario);
        String theme = usuario.getTheme();
        return "redirect:/astro?" + "theme=" + theme;
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

            if (user.isAdmin()) {

                // Obter a data e hora atual no fuso horário de Brasília
                ZonedDateTime now = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));

                // Converter ZonedDateTime para Date
                Date date = Date.from(now.toInstant());
                user.setLastAccess(date);
                repository.save(user);

                // Gerar token e redirecionar com o token na URL
                String token = tokenService.generateToken(username, user.getEmail());
                user.setToken(token);
                repository.save(user);
                String theme = user.getTheme();
                return "redirect:/admpage?" + "theme=" + theme;


            }
            // Obter a data e hora atual no fuso horário de Brasília
            ZonedDateTime now = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));

            // Converter ZonedDateTime para Date
            Date date = Date.from(now.toInstant());
            user.setLastAccess(date);
            repository.save(user);

            // Gerar token e redirecionar com o token na URL
            String token = tokenService.generateToken(username, user.getEmail());
            user.setToken(token);
            repository.save(user);
            String theme = user.getTheme();

            return "redirect:/astro?" + "theme=" + theme;
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
        return "redirect:/astro";
    }

    @GetMapping("/admpage")
    public String admPage() {
        return "admpage";
    }
}