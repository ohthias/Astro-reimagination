package com.example.Astro.Controller;

/*
    Autor: Kaique Magalhães Santos
    Projeto: Astro
    Data: 24.09.2024
 */
import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Controller
public class HomeController {

    @Autowired
    UserRepository repository;

    User user = new User();

    // Página inicial
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

    // Exibir detalhes do artista
    @GetMapping("/artist/{id}")
    public String getArtistDetails(@PathVariable("id") String artistId, Model model) {
        String spotifyApiUrl = "https://api.spotify.com/v1/artists/" + artistId;
        RestTemplate restTemplate = new RestTemplate();

        // Obter o token da API do Spotify
        String token = "SEU_TOKEN_DE_ACESSO_AQUI";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(spotifyApiUrl, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                // Parsear os detalhes do artista
                String artistDetailsJson = response.getBody();

                // Adiciona os detalhes à model para exibir na página
                model.addAttribute("artistDetails", artistDetailsJson);

                return "artist"; // Página que exibe os detalhes do artista
            } else {
                model.addAttribute("errorMessage", "Não foi possível buscar os detalhes do artista");
                return "error"; // Página de erro
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao buscar os detalhes do artista");
            return "error"; // Página de erro
        }
    }

    // Rota para cadastrar um novo usuário
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
        return "home"; // Redireciona para a página principal
    }

    // Rota para realizar o login do usuário
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
                return "login"; // Redireciona para a tela de login
            }

            boolean passwordMatch = passwordEncoder.matches(hashWord, user.getClienteHashWord());

            if (!passwordMatch) {
                System.out.println("Senha Incorreta");
                model.addAttribute("errorMessage", "Senha incorreta");
                return "login"; // Redireciona para a tela de login
            }

            return "home"; // Redireciona para a página principal
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao processar o login");
            return "login"; // Redireciona para a tela de login em caso de erro
        }
    }

    // Nova rota para login via Google
    @PostMapping("/login/google")
    public String googleLogin(@RequestParam("token") String token, Model model) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList("698525942853-ej133gg4bfbh0adt7mkid489ul06o1e7.apps.googleusercontent.com.apps.googleusercontent.com"))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String username = (String) payload.get("name");

                // Verificar se o usuário já existe
                User existingUser = repository.findByClienteEmail(email);

                if (existingUser == null) {
                    // Se o usuário não existir, cria um novo
                    User newUser = new User(null, email, null, username);
                    repository.save(newUser);
                    model.addAttribute("message", "Usuário criado com sucesso");
                } else {
                    model.addAttribute("message", "Usuário já cadastrado, login realizado com sucesso");
                }

                return "home"; // Redireciona para a página principal
            } else {
                model.addAttribute("errorMessage", "Token do Google inválido");
                return "login"; // Redireciona para a tela de login
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erro ao verificar o token do Google");
            return "login"; // Redireciona para a tela de login em caso de erro
        }
    }
}
