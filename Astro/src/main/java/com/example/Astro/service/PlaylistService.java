package com.example.Astro.Service;

import com.example.Astro.Model.Playlist;
import com.example.Astro.Repository.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;

    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public List<Playlist> getPlaylistsByUser(Long userId) {
        return playlistRepository.findByIdUserDetails(userId);
    }

    public Playlist createPlaylist(Playlist playlist) {
        playlist.setUpdateAt(LocalDate.now()); // Define a data de atualização ao criar
        return playlistRepository.save(playlist);
    }

    public Playlist updatePlaylist(Long id, Playlist updatedPlaylist) {
        return playlistRepository.findById(id).map(playlist -> {
            playlist.setName(updatedPlaylist.getName());
            playlist.setUpdateAt(LocalDate.now());
            playlist.setPublicPlay(updatedPlaylist.getPublicPlay());
            return playlistRepository.save(playlist);
        }).orElseThrow(() -> new RuntimeException("Playlist não encontrada"));
    }
}
