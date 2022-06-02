// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Animals",
	artist: "Maroon 5",
	image: "/Songs/Maroon 5 animals.jpg",
	path: "/Songs/[MP3DOWNLOAD.TO] Maroon 5 - Animals (Lyrics)-128k.mp3"
},
{
	name: "Thunder",
	artist: "Imagine Dragons",
	image: "/Songs/imagine dragons pic.jpg",
	path: "/Songs/Imagine Dragons - Thunder.mp3"
},
{
	name: "Shape of You",
	artist: "Ed Sheeran",
	image: "/Songs/shape of you pic.jpg",
	path: "/Songs/Ed Sheeran -64.mp3",
},
{
	name: "Eye of the Tiger",
	artist: "Rocky III",
	image: "/Songs/Rocky III Eye of the tiger image.jpg",
	path: "/Songs/[MP3DOWNLOAD.TO] Rocky III • Eye of the Tiger • Survivor-192k.mp3"
},
{
    name:"Faster Cars",
    artist:"Loving Caliber",
    image:"",
    path:"/Songs/Loving Caliber Faster Car.mp3"
},
{
	name: "Get it Right",
	artist: "Diplo",
	image: "/Songs/Diplo get it right pic.jpg",
	path: "/Songs/Diplo - Get It Right (feat. MØ) (Official Music Video)-64.mp3"
},
{
	name: "Taki Taki",
	artist: "Selena Gomez, Cardi B",
	image: "/Songs/Taki Taki pic.jpg",
	path: "/Songs/DJ Snake - Taki Taki (Lyrics) ft. Selena Gomez, Ozuna, Cardi B-64.mp3",
},
{
    name: "Ready for it",
    artist: "Taylor Swift",
    image: "/Songs/Ready for it.jpg",
    path: "/Songs/1. Ready for it.mp3",
},
{
    name: "Bad Blood",
    artist: "Taylor Swift",
    image: "/Songs/Taylor_Swift_Feat._Kendrick_Lamar_-_Bad_Blood_(Official_Single_Cover).png",
    path: "/Songs/2. Bad Blood.mp3",
},

{
    name: "London Boy",
    artist: "Taylor Swift",
    image: "/Songs/London Boy.jpg",
    path: "/Songs/3. London Boy.mp3",
},
{
    name: "Love Story",
    artist: "Taylor Swift",
    image: "/Songs/Taylor_Swift_-_Love_Story.png",
    path: "/Songs/4. Love Story.mp3",
},
{
    name: "All to well",
    artist: "Taylor Swift",
    image: "/Songs/All too well.jpg",
    path: "/Songs/5. All to well.mp3",
},
{
    name: "Betty",
    artist: "Taylor Swift",
    image: "/Songs/Betty.jpg",
    path: "/Songs/6. Betty.mp3",
},
{
    name: "You belong to me",
    artist: "Taylor Swift",
    image: "/Songs/You belong to me.jpg",
    path: "/Songs/7. You belong with me.mp3",
},
{
    name: "Shake it off",
    artist: "Taylor Swift",
    image: "/Songs/Shake it off.jpg",
    path: "/Songs/8. Shake it Off.mp3",
},
{
    name: "Paper Rings",
    artist: "Taylor Swift",
    image: "/Songs/Paper Rings.jpg",
    path: "/Songs/9. Paper Rings.mp3",
},
{
    name: "New Years Day",
    artist: "Taylor Swift",
    image: "/Songs/Taylor Swift New Years Day Ernesth Garcia.jpg",
    path: "/Songs/10. New Years Day.mp3",
},
{
    name: "Blank Space",
    artist: "Taylor Swift",
    image: "/Songs/Blank space.jpg",
    path: "/Songs/Taylor_Swift_-_Blank_Space_(Jesusful.com).mp3",
},
{
    name:"I forgot that you exsited",
    artist:"Taylor Swift",
    image:"/Songs/I forgot that you exsisted.jpg",
    path:"/Songs/01. I Forgot That You Existed.mp3"
},
];
function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.background.src = "url("+track_list[track_index].image+")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent ="PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    i=0; 
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
   //let red = Math.floor(Math.random() * 256) + 64;
   //let green = Math.floor(Math.random() * 256) + 64;
   //let blue = Math.floor(Math.random() * 256) + 64;
    
   // Construct a color withe the given values
   // let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    let colors=["red","orange","yellow","green","red","orange","yellow","green","red","orange","yellow","green",]
    document.body.style.background = colors[i]
    i=i+1;
    if(i==colors.length){
        i=0;
    }

    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
    }
        
    function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
        
    function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
            
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
    
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
    }
    
    function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
    }
    
    function seekUpdate() {
    let seekPosition = 0;
    
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
    
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
    }
    // load the first song
    loadTrack(track_index);                        