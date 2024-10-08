package com.example.Astro.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "User_Details")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser_Details") // Nome exato da coluna no banco de dados
    private Long idUserDetails;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "Username")
    private String username;

    @Column(name = "token")
    private String token;

    @Column(name = "last_access")
    private Date last_access;

    public User() {
        super();
    }

    public User(Long idUserDetails, String email, String password, String username, String token) {
        super();
        this.idUserDetails = idUserDetails;
        this.email = email;
        this.password = password;
        this.username = username;
        this.token = token;
    }

    // Getters e Setters

    public Long getIdUserDetails() {
        return idUserDetails;
    }

    public void setIdUserDetails(Long idUserDetails) {
        this.idUserDetails = idUserDetails;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getLast_access() {
        return last_access;
    }

    public void setLast_access(Date last_access) {
        this.last_access = last_access;
    }
}
