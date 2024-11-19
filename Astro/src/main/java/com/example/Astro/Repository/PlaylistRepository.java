package com.example.Astro.Repository;

import com.example.Astro.Model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByIdUserDetails(Long userId); // Para buscar playlists de um usuário específico
}