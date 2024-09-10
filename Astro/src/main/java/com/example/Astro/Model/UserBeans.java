package com.example.Astro.Model;

public class UserBeans {
    private String idCliente;
    private String clienteEmail;
    private String clienteHashWord;
    private String clienteUsername;

    public UserBeans(String idCliente, String clienteEmail, String clienteHashWord, String clienteUsername) {
        this.idCliente = idCliente;
        this.clienteEmail = clienteEmail;
        this.clienteHashWord = clienteHashWord;
        this.clienteUsername = clienteUsername;
    }

    public UserBeans(String idCliente, String clienteEmail, String clienteHashword, String clienteUsername, String clienteCreationDate, String clienteLastAcess) {
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
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
