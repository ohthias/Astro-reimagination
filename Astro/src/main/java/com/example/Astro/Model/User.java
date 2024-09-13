package com.example.Astro.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clienteEmail;
    private String clienteHashWord;
    private String clienteUsername;

    public User(String idCliente, String clienteEmail, String clienteHashWord, String clienteUsername) {

        this.clienteEmail = clienteEmail;
        this.clienteHashWord = clienteHashWord;
        this.clienteUsername = clienteUsername;
    }

    public User(String idCliente, String clienteEmail, String clienteHashword, String clienteUsername, String clienteCreationDate, String clienteLastAcess) {
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

    public String getClienteUsername() {
        return clienteUsername;
    }

    public void setClienteUsername(String clienteUsername) {
        this.clienteUsername = clienteUsername;
    }
}
