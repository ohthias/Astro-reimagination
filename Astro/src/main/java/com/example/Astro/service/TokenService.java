package com.example.Astro.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenService {

    private SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Use uma chave secreta mais forte e segura em produção

    // Gera o token (como já implementado)
    public String generateToken(String username, String email) {
        return Jwts.builder()
                .setSubject(username)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 horas
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Método para validar o token e extrair os dados
    public Claims validateToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            throw new RuntimeException("Token inválido ou expirado.");
        }
    }

}
