const searchSongs = () => {
    const searchText = document.getElementById('search-text').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))

}

const displaySongs = songs => {
    // console.log(songs)
    const searchSongsArea = document.getElementById('searchSongsArea');
    searchSongsArea.innerHTML = '';

    songs.forEach(song => {
        // console.log(song)
        const songsArea = document.createElement('div');
        songsArea.className = "single-result row align-items-center my-3 p-3";
        songsArea.innerHTML = `
            <div class="col-md-9">
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
                <h3 id="lyricsName" class="lyrics-name">${song.album.title}</h3>
                <p class="author lead">Album by <span id="artistName">${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="displayLyrics('${song.artist.name}', '${song.album.title}')">Get Lyrics</button>
            </div>
        `;
        searchSongsArea.appendChild(songsArea);

    });
}

const displayLyrics = (artist, title) => {
    // console.log(artist, title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log
    fetch(url)
        .then(response => response.json())
        .then(data => lyricsShow(data.lyrics))
}
const lyricsShow = lyrics => {
    const singleLyrics = document.getElementById('singleLyrics');
    singleLyrics.innerText = lyrics;
}