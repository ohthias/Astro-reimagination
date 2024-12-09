import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import yt_dlp
import time

# Suas credenciais do Spotify
client_id = '8b8a8c66585b4376b70f7362c50fbdf0'
client_secret = 'e856e53832ad4651a0dc1ab0ba1d33fc'

# Sua chave da API do YouTube
youtube_api_key = 'AIzaSyAi-ztkG6fNenaKjRohhOCeyyUplD6iSDg'

# Autenticação no Spotify
auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

# Função para obter músicas de uma playlist do Spotify
def get_playlist_tracks(playlist_id):
    results = sp.playlist_tracks(playlist_id)
    tracks = []
    for item in results['items']:
        track = item['track']
        track_info = {
            'name': track['name'],
            'artists': ', '.join([artist['name'] for artist in track['artists']])
        }
        tracks.append(track_info)
    return tracks

# Função para pesquisar músicas no YouTube
def search_youtube_music(track_name, artist_name):
    youtube = build('youtube', 'v3', developerKey=youtube_api_key)
    
    query = f"{track_name} {artist_name} official music"
    
    try:
        request = youtube.search().list(
            part="snippet",
            maxResults=1,
            q=query,
            type="video"
        )
        response = request.execute()

        # Extrair o primeiro vídeo da resposta
        if response['items']:
            video_id = response['items'][0]['id']['videoId']
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            return video_url
        return None

    except HttpError as e:
        if e.resp.status == 403:  # Quota exceeded
            print("Quota da API do YouTube excedida. Por favor, tente novamente mais tarde.")
            return None
        else:
            print(f"Ocorreu um erro: {e}")
            return None

# Função para baixar vídeo ou áudio usando yt-dlp
def baixar_video(link, only_audio=True):
    ydl_opts = {
        'format': 'bestaudio/best' if only_audio else 'best',
        'outtmpl': '%(title)s.%(ext)s',  # Nome do arquivo de saída
        'quiet': False,  # Mostra o progresso no terminal
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link])
        print(f"Download concluído para o link: {link}")
    except Exception as e:
        print(f"Erro ao processar o link {link}: {e}")

# IDs das playlists do Spotify
top_50_global = '37i9dQZEVXbMDoHDwVN2tF'

# Obter músicas da playlist
tracks = get_playlist_tracks(top_50_global)

# Pesquisar e baixar cada música no YouTube
for track in tracks:
    track_name = track['name']
    artist_name = track['artists']
    video_url = search_youtube_music(track_name, artist_name)
    
    if video_url:
        print(f"Baixando: {track_name} - {artist_name}")
        baixar_video(video_url, only_audio=True)
    
    # Aguarde um pouco antes da próxima requisição
    time.sleep(1)  # Ajuste o tempo conforme necessário
