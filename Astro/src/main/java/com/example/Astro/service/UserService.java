package com.example.Astro.service;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByToken(String token) {
        // Supondo que você tenha um método que busca o usuário pelo token
        return userRepository.findByToken(token);
    }
    public boolean updateUserTheme(String token, String theme) {
        User user = getUserByToken(token);
        if (user != null) {
            user.setTheme(theme);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
