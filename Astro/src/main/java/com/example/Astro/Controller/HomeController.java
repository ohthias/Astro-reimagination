package com.example.Astro.Controller;

/*
    Autor: Kaique Magalhães Santos
    Projeto: Astro
    Data: 24.09.2024
 */
import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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

    @GetMapping("/artist")
    public String artist() { return  "artist";}

    @GetMapping("/busca")
    public  String busca() {return "busca";}

    @GetMapping("/artist/{id}")
    public String getArtistDetails(@PathVariable("id") String artistId, Model model) {
        String spotifyApiUrl = "https://api.spotify.com/v1/artists/" + artistId;
        RestTemplate restTemplate = new RestTemplate();

        // Aqui você precisa autenticar e obter o token do Spotify.
        String token = "SEU_TOKEN_DE_ACESSO_AQUI";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(spotifyApiUrl, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                // Parsear a resposta JSON para pegar os detalhes do artista
                String artistDetailsJson = response.getBody();

                // Adicione os detalhes à model para serem exibidos na página
                model.addAttribute("artistDetails", artistDetailsJson);

                return "artist"; // Nome da view (HTML) para exibir os detalhes do artista
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