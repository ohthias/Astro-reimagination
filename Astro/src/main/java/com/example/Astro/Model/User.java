package com.example.Astro.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long id;

    @Column(name = "cliente_email")
    private String clienteEmail;

    @Column(name = "cliente_hashword")
    private String clienteHashWord;

    @Column(name = "cliente_username")
    private String username;

    public User() {
        super();
    }

    public User(Long id, String clienteEmail, String clienteHashWord, String username) {
        this.id = id;
        this.clienteEmail = clienteEmail;
        this.clienteHashWord = clienteHashWord;
        this.username = username;
    }

    // Getters e Setters
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
