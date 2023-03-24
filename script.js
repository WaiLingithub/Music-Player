const playListContainerTag =
  document.getElementsByClassName("playListContainer")[0];
const audioTag = document.querySelector(".audioTag");
const currentAndTotalTimeTag = document.querySelector(".currentAndTotalTime");
const currentProgressTag = document.querySelector(".currentProgress");
const backwardButton = document.querySelector(".backwardButton");
const playButton = document.querySelector(".playButton");
const pauseButton = document.getElementsByClassName("pauseButton")[0];
const nextButton = document.querySelector(".nextButton");

let tracks = [
  { trackPath: "music/music1.mp3", title: "Alan Walker - faded" },
  { trackPath: "music/music2.mp3", title: "Maroon - Girl Like You" },
  { trackPath: "music/music3.mp3", title: "Right Here Waiting" },
  { trackPath: "music/music4.mp3", title: "Dancing With Your Ghost" },
];

for (let i = 0; i < tracks.length; i++) {
  const musicContainerTag = document.createElement("div");
  musicContainerTag.classList.add("musicContainer");
  const musicName = tracks[i].title;
  musicContainerTag.textContent = (i + 1).toString() + ". " + musicName;

  musicContainerTag.addEventListener("click", () => {
    playing = i;
    playSong();
  });
  playListContainerTag.append(musicContainerTag);
}

let duration = 0;
let totalTime = 0;
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration);
  totalTime = updateCurrentAndTotalTime(duration);
});

let currentTime = 0;
audioTag.addEventListener("timeupdate", () => {
  currentTime = Math.floor(audioTag.currentTime);
  const updateCurrentTime = updateCurrentAndTotalTime(currentTime);
  currentAndTotalTimeTag.textContent = `${updateCurrentTime} / ${totalTime}`;
  const currentWidth = (400 / duration) * currentTime;
  currentProgressTag.style.width = currentWidth.toString() + "px";
});

const updateCurrentAndTotalTime = (time) => {
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();
  const minutesText = minutes < 10 ? "0" + minutes : minutes;
  const secondsText = seconds < 10 ? "0" + seconds : seconds;
  const updateTime = `${minutesText}:${secondsText}`;
  return updateTime;
};
let playing = true;
let playingIndex = 0;
playButton.addEventListener("click", () => {
  playing = true;
  if (currentTime === 0) {
    playSong();
  } else {
    audioTag.play();
    updatePlayAndPauseButton();
  }
});

pauseButton.addEventListener("click", () => {
  playing = false;
  audioTag.pause();
  updatePlayAndPauseButton();
});

backwardButton.addEventListener("click", () => {
  if (playingIndex === 0) {
    return;
  } else {
    playingIndex -= 1;
    playSong();
  }
});

nextButton.addEventListener("click", () => {
  if (playingIndex === tracks.length - 1) {
    return;
  } else {
    playingIndex += 1;
    playSong();
  }
});

const playSong = () => {
  const musicURL = tracks[playingIndex].trackPath;
  audioTag.src = musicURL;
  audioTag.play();
  playing = true;
  updatePlayAndPauseButton();
};

const updatePlayAndPauseButton = () => {
  if (playing) {
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
  } else {
    playButton.style.display = "inline";
    pauseButton.style.display = "none";
  }
};
