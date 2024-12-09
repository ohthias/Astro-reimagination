package com.example.Astro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
    public User getUserByToken(String token) {
        // Supondo que você tenha um método que busca o usuário pelo token
        System.out.println(token);
        return userRepository.findByToken(token);
    }

}
