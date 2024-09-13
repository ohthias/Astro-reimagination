package com.example.Astro.Service;

import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        user.setClienteHashWord(user.getClienteHashWord());
        return userRepository.save(user);
    }
}