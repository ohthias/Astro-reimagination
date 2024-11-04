package com.example.Astro.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "User_Details")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser_Details")
    private Long idUserDetails;

    @Column(name = "token")
    private String token;

    @Column(name = "theme")
    private String theme;

    @Column(name = "language")
    private String language;

    @Column(name = "country")
    private String country;

    // Relacionamento com a classe Login
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id", referencedColumnName = "idLogin")
    private Login login;

    // Relacionamento com a classe Image
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "idImage")
    private Image image;

    // Relacionamento com a classe Playlist
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Playlist> playlists;

    // Getters e Setters

    public Long getIdUserDetails() {
        return idUserDetails;
    }

    public void setIdUserDetails(Long idUserDetails) {
        this.idUserDetails = idUserDetails;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<Playlist> playlists) {
        this.playlists = playlists;
    }

    // (Adicionar métodos para token, theme, language, country, login, image e playlists)
}

@Entity
@Table(name = "Login")
class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idLogin")
    private Long idLogin;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "last_access")
    private LocalDate lastAccess;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "google_auth")
    private boolean googleAuth;

    @Column(name = "facebook_auth")
    private boolean facebookAuth;

    // Relacionamento reverso com User
    @OneToOne(mappedBy = "login")
    private User user;

    public Login() {}

    // Getters e Setters

    public Long getIdLogin() {
        return idLogin;
    }

    public void setIdLogin(Long idLogin) {
        this.idLogin = idLogin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getLastAccess() {
        return lastAccess;
    }

    public void setLastAccess(LocalDate lastAccess) {
        this.lastAccess = lastAccess;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isGoogleAuth() {
        return googleAuth;
    }

    public void setGoogleAuth(boolean googleAuth) {
        this.googleAuth = googleAuth;
    }

    public boolean isFacebookAuth() {
        return facebookAuth;
    }

    public void setFacebookAuth(boolean facebookAuth) {
        this.facebookAuth = facebookAuth;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

@Entity
@Table(name = "Image")
class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idImage")
    private Long idImage;

    @Column(name = "text")
    private String text;

    @Column(name = "url")
    private String url;

    // Relacionamento reverso com User
    @OneToOne(mappedBy = "image")
    private User user;

    public Image() {}

    // Getters e Setters

    public Long getIdImage() {
        return idImage;
    }

    public void setIdImage(Long idImage) {
        this.idImage = idImage;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

@Entity
@Table(name = "Playlist")
class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPlaylist")
    private Long idPlaylist;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    // Relacionamento com User
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "idUser_Details")
    private User user;

    // Relacionamento com Track
    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Track> tracks;

    public Playlist() {}

    // Getters e Setters

    public Long getIdPlaylist() {
        return idPlaylist;
    }

    public void setIdPlaylist(Long idPlaylist) {
        this.idPlaylist = idPlaylist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }
}

@Entity
@Table(name = "Track")
class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTrack")
    private Long idTrack;

    @Column(name = "track_id")
    private String trackId;

    // Relacionamento com Playlist
    @ManyToOne
    @JoinColumn(name = "playlist_id", referencedColumnName = "idPlaylist")
    private Playlist playlist;

    public Track() {}

    // Getters e Setters

    public Long getIdTrack() {
        return idTrack;
    }

    public void setIdTrack(Long idTrack) {
        this.idTrack = idTrack;
    }

    public String getTrackId() {
        return trackId;
    }

    public void setTrackId(String trackId) {
        this.trackId = trackId;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }
}
