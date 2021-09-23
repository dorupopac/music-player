// Selectors
const imageEl = document.querySelector('img');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const audioEl = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playerControls = document.querySelector('.player-controls');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'track-1',
    displayName: 'track1',
    artist: 'track1',
  },
  {
    name: 'track-2',
    displayName: 'track2',
    artist: 'track2',
  },
  {
    name: 'track-3',
    displayName: 'track3',
    artist: 'track3',
  },
  {
    name: 'track-4',
    displayName: 'track4',
    artist: 'track4',
  },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  audioEl.play();
};

// Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  audioEl.pause();
};

// Update DOM
const loadSong = song => {
  titleEl.textContent = song.displayName;
  artistEl.textContent = song.artist;
  audioEl.src = `music/${song.name}.mp3`;
  imageEl.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Prev Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = e => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audioEl;
  audioEl.currentTime = (clickX / width) * duration;
};

// Event Listeners
playerControls.addEventListener('click', e => {
  if (e.target.closest('#play')) {
    isPlaying ? pauseSong() : playSong();
  }
  if (e.target.closest('#prev')) {
    prevSong();
  }
  if (e.target.closest('#next')) {
    nextSong();
  } else return;
});
audioEl.addEventListener('ended', nextSong)
audioEl.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
