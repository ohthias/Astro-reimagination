package com.example.Astro.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "User_Details")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser_Details")
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
    private LocalDate lastAccess;

    public User() {
        super();
    }

    public User(Long idUserDetails, String email, String password, String username, LocalDate lastAccess, String token) {
        super();
        this.idUserDetails = idUserDetails;
        this.email = email;
        this.password = password;
        this.username = username;
        this.lastAccess = lastAccess;
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

    public LocalDate getLastAccess() {
        return lastAccess;
    }

    public void setLastAccess(LocalDate lastAccess) {
        this.lastAccess = lastAccess;
    }
}