package com.example.Astro.Controller;

import com.example.Astro.Model.Playlist;
import com.example.Astro.Service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Playlist>> getPlaylistsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(playlistService.getPlaylistsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable Long id, @RequestBody Playlist updatedPlaylist) {
        return ResponseEntity.ok(playlistService.updatePlaylist(id, updatedPlaylist));
    }
}
