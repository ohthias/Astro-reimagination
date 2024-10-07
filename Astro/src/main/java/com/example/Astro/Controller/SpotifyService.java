package com.example.Astro.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class SpotifyService {
    private final RestTemplate restTemplate;

    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    public SpotifyService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private String getAccessToken() {
        String url = "https://accounts.spotify.com/api/token";
        String authString = clientId + ":" + clientSecret;
        String base64Encoded = Base64.getEncoder().encodeToString(authString.getBytes(StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + base64Encoded);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            return (String) responseBody.get("access_token");
        } else {
            throw new RuntimeException("Falha ao obter o token de acesso");
        }
    }

    public Map<String, Object> search(String query) {
        String accessToken = getAccessToken();
        String url = String.format("https://api.spotify.com/v1/search?q=%s&type=artist,track,playlist",
                UriUtils.encode(query, StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();

            if (responseBody != null) {
                // Ordenando artistas, músicas e playlists por popularidade
                List<Map<String, Object>> artists = (List<Map<String, Object>>) ((Map<String, Object>) responseBody.get("artists")).get("items");
                List<Map<String, Object>> tracks = (List<Map<String, Object>>) ((Map<String, Object>) responseBody.get("tracks")).get("items");
                List<Map<String, Object>> playlists = (List<Map<String, Object>>) ((Map<String, Object>) responseBody.get("playlists")).get("items");

                if (artists != null) {
                    artists.sort((a1, a2) -> {
                        Integer popularity1 = (Integer) a1.get("popularity");
                        Integer popularity2 = (Integer) a2.get("popularity");
                        return (popularity1 == null ? -1 : (popularity2 == null ? 1 : popularity2.compareTo(popularity1)));
                    });
                }

                if (tracks != null) {
                    tracks.sort((t1, t2) -> {
                        Integer popularity1 = (Integer) t1.get("popularity");
                        Integer popularity2 = (Integer) t2.get("popularity");
                        return (popularity1 == null ? -1 : (popularity2 == null ? 1 : popularity2.compareTo(popularity1)));
                    });
                }

                if (playlists != null) {
                    playlists.sort((p1, p2) -> {
                        Integer popularity1 = (Integer) p1.get("popularity");
                        Integer popularity2 = (Integer) p2.get("popularity");
                        return (popularity1 == null ? -1 : (popularity2 == null ? 1 : popularity2.compareTo(popularity1)));
                    });
                }
            }

            return responseBody;
        } else {
            throw new RuntimeException("Falha ao realizar a busca: " + response.getBody());
        }
    }
}