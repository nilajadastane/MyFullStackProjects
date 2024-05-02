// Get references to HTML elements
const audio = document.getElementById('audio'); // Reference the <audio> element
const songList = document.getElementById("song-list");
const searchInput = document.getElementById('search-input');

// Create a copy of the original song list
const originalList = [...songs];
let currentSongIndex = 0;
let isShuffle = false;

// Function to update the displayed song list
function updatePlayList(playlist){
    songList.innerHTML = '';
    // Iterate through each song in the playlist and create list elements
    playlist.forEach(song => {
        let liElement = document.createElement("li");
        liElement.innerHTML = `${Object.values(song)[0]}`; // Display song title
        songList.appendChild(liElement);
    });    
}

// Update the UI with the current song information
function updateUI(currentSongIndex, playlist) {
    document.getElementById('song-title').textContent = playlist[currentSongIndex]["title"];
    document.getElementById('song-artist').textContent = playlist[currentSongIndex]["artist-name"];
}

// Function to play the current song
function playSong(playlist) {
    audio.pause();
    audio.src = playlist[currentSongIndex]["url"]; // Set the audio source to the current song URL
    audio.play();
    updateUI(currentSongIndex, playlist);
}

// Event delegation for song selection
songList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentSongIndex = [...songList.children].indexOf(e.target); // Get the index of the clicked song
        playSong(isShuffle ? songs : originalList); // Play the selected song
    }
});

// Event listeners for play, next, and previous buttons
document.getElementById('play-button').addEventListener('click', () => {
    playSong(isShuffle ? songs : originalList);
});

document.getElementById('next-button').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song index
    playSong(isShuffle ? songs : originalList);
});

document.getElementById('prev-button').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Move to the previous song index
    playSong(isShuffle ? songs : originalList);
});

// Function for shuffling an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements to shuffle the array
    }
}

// Event listener for the shuffle button
document.getElementById('shuffle-button').addEventListener('click', (event) => {
    isShuffle = !isShuffle; // Toggle shuffle mode

    if (isShuffle) {
        event.target.textContent = "Click to Unshuffle";
        shuffleArray(songs); // Shuffle the songs array
        updatePlayList(songs);
        currentSongIndex = 0;
        playSong(songs);
    } else {
        event.target.textContent = "Click to Shuffle";
        updatePlayList(originalList);
        currentSongIndex = 0;
        playSong(originalList);
    }
});

// Event listener for the search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    // Filter the original list based on the search term
    const filteredSongs = originalList.filter((song) =>
        song.title.toLowerCase().includes(searchTerm)
    );
    updatePlayList(filteredSongs); // Update the displayed song list with filtered results
});

// Initializations
updatePlayList(originalList);
updateUI(currentSongIndex, originalList);

var data = [4,6,7,2,88,2];
console.log(data.sort());
console.log("sdsdsdsds")
console.log(data.reverse());
console.log("i==="+data.length);