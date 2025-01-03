const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const loading = document.getElementById("loading");
const results = document.getElementById("results");
const trackTitle = document.getElementById("trackTitle");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const alternatives = document.getElementById("alternatives");
const tryAgainButton = document.getElementById("tryAgain");
const playPauseIcon = document.getElementById("playPauseIcon");
const volumeSlider = document.getElementById("volumeSlider");

let isPlaying = false;

const soundscapes = {
    "Campfire": ["campfire", "fire", "crackling", "night", "camping"],
    "Coastal Waves": ["beach", "ocean", "waves", "sea", "coast"],
    "Forest with Bird Sounds": ["forest", "birds", "nature", "trees", "woods"],
    "Coffee Shop": ["cafe", "coffee", "chatter", "ambient", "busy"],
    "Thunderstorm": ["rain", "storm", "thunder", "intense", "downpour"]
};

const soundscape_files = {
    "Campfire": "campfire.mp3",
    "Coastal Waves": "coastal_waves.mp3",
    "Forest with Bird Sounds": "forest_birds.mp3",
    "Coffee Shop": "coffee_shop.mp3",
    "Thunderstorm": "thunderstorm.mp3"
}

function findSoundscape(input) {
    const lowerCaseInput = input.toLowerCase();
    let bestMatch = null;
    let highestMatchCount = 0;

    for (const track in soundscapes) {
        let matchCount = 0;
        for (const keyword of soundscapes[track]) {
            if (lowerCaseInput.includes(keyword)) {
                matchCount++;
            }
        }
        if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            bestMatch = track;
        }
    }
    
    // fallback
    if (bestMatch == null) {
        bestMatch = "Coastal Waves";
    }

    return bestMatch;
}

function loadTrack(track) {
    audioSource.src = `audio/${soundscape_files[track]}`;
    audioPlayer.load();
    audioPlayer.loop = true;
}

function reset() {
    loading.style.display = "none";
    results.style.display = "none";
    userInput.value = "";
}

submitButton.addEventListener("click", () => {
    const userInputValue = userInput.value;
    loading.style.display = "block";
    results.style.display = "none";
    alternatives.innerHTML = "";

    setTimeout(() => {
        const selectedTrack = findSoundscape(userInputValue);
        trackTitle.textContent = selectedTrack;
        loadTrack(selectedTrack);

        const otherTracks = Object.keys(soundscapes).filter(track => track !== selectedTrack);
        for (let i = 0; i < 2; i++) {
            const altTrack = otherTracks[i];
            const altButton = document.createElement("button");
            altButton.textContent = altTrack;
            altButton.addEventListener("click", () => {
                loadTrack(altTrack);
                trackTitle.textContent = altTrack;
            });
            alternatives.appendChild(altButton);
        }

        loading.style.display = "none";
        results.style.display = "block";
    }, 1000);
});

tryAgainButton.addEventListener("click", () => {
    reset();
});

// Initialize play/pause functionality
playPauseIcon.addEventListener("click", togglePlay);

// Volume control
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseIcon.classList.remove("playing");
    } else {
        audioPlayer.play();
        playPauseIcon.classList.add("playing");
    }
    isPlaying = !isPlaying;
}
