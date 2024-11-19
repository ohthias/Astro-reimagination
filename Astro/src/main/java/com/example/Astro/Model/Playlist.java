package com.example.Astro.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name ="playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPlaylists")
    private long idPlaylists;

    @Column(name = "Name")
    private String name;

    @Column(name = "Update_At")
    private LocalDate updateAt;

    @Column(name = "Public")
    private Boolean publicPlay;

    @Column(name = "id_User_Details")
    private Long idUserDetails;

    public void setIdPlaylists(long idPlaylists) {
        this.idPlaylists = idPlaylists;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public void setPublicPlay(Boolean publicPlay) {
        this.publicPlay = publicPlay;
    }

    public void setIdUserDetails(Long idUserDetails) {
        this.idUserDetails = idUserDetails;
    }

    public LocalDate getUpdateAt() {
        return updateAt;
    }

    public Boolean getPublicPlay() {
        return publicPlay;
    }

    public Long getIdUserDetails() {
        return idUserDetails;
    }

    public String getName() {
        return name;
    }

    public long getIdPlaylists() {
        return idPlaylists;
    }
}
