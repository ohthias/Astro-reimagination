package com.example.Astro.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long id;

    @Column(name = "cliente_email", nullable = false, unique = true)
    private String clienteEmail;

    @Column(name = "cliente_hash_word", nullable = false)
    private String clienteHashWord;

    @Column(name = "username", nullable = false)
    private String username;

    public User() {}

    public User(Long id, String clienteEmail, String clienteHashWord, String username) {
        this.id = id;
        this.clienteEmail = clienteEmail;
        this.clienteHashWord = clienteHashWord;
        this.username = username;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClienteEmail() {
        return clienteEmail;
    }

    public void setClienteEmail(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }

    public String getClienteHashWord() {
        return clienteHashWord;
    }

    public void setClienteHashWord(String clienteHashWord) {
        this.clienteHashWord = clienteHashWord;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
