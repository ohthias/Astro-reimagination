package com.example.Astro.Repository;

import com.example.Astro.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByToken(String token);
    User findByEmail(String email);
}
