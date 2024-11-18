// lyrics.js
export async function getLyrics(artist, title) {
  const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(
    artist
  )}/${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Não foi possível carregar a letra.");
    }

    const data = await response.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    displayLyrics(error.message);
  }
}

export function displayLyrics(lyrics) {
  const lyricsContainer = document.getElementById("songLyrics");
  lyricsContainer.innerHTML = "";

  if (!lyrics) {
    lyrics = "Nenhuma letra encontrada.";
  }

  const lines = lyrics.split("\n");

  lines.forEach((line) => {
    if (line.trim() === "") {
      const br = document.createElement("br");
      lyricsContainer.appendChild(br);
    } else {
      const p = document.createElement("p");
      p.className = "montserrat-semi-bold lyrics-line";
      p.textContent = line;
      lyricsContainer.appendChild(p);
    }
  });
}
