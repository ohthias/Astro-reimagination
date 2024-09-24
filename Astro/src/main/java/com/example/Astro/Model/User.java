package com.example.Astro.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clienteEmail;
    private String clienteHashWord;
    private String username;

    public User(){
        super();
    }

    public User(Long idCliente, String clienteEmail, String clienteHashWord, String username) {
        super();
        this.id = idCliente;
        this.clienteEmail = clienteEmail;
        this.clienteHashWord = clienteHashWord;
        this.username = username;
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
        return username;
    }

    public void setClienteUsername(String clienteUsername) {
        this.username = clienteUsername;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}
}