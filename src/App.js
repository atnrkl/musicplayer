//import styles
import "./styles/app.scss";
//import styles

//import components
import React, { useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./ChillHop";
import Library from "./components/Library";
import Nav from "./components/Nav";
//import components

function App() {
  //state
  const [isLibOpen, setisLibOpen] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
  });
  //ref
  const audioRef = useRef(null);

  // functions
  const timeUpdateHandler = (e) => {
    const duration = e.target.duration;
    const currentTime = e.target.currentTime;

    setSongInfo({ ...songInfo, duration, currentTime });
  };

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    audioRef.current.play();
  };

  return (
    <div className="App">
      {/* <h1>Music Player</h1> */}
      <Nav isLibOpen={isLibOpen} setisLibOpen={setisLibOpen} />
      <Song currentSong={currentSong} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        currentSong={currentSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        isPlaying={isPlaying}
        audioRef={audioRef}
        setisPlaying={setisPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isLibOpen={isLibOpen}
      />

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
