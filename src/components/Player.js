import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  isPlaying,
  setisPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  //state
  //ref
  //useEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
  //handlers
  const playSongHandler = () => {
    if (isPlaying === false) {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const secondsWithZero = String(seconds).padStart(2, "0");
    return `${minutes}:${secondsWithZero}`;
  };

  const skipTrackHandler = async (type) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (type === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      console.log(Math.abs(currentIndex - 1) % songs.length);
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        return;
      }
      await setCurrentSong(songs[Math.abs((currentIndex - 1) % songs.length)]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        {/* min time */}
        <p>{getTime(songInfo.currentTime)}</p>
        {/* range bar */}
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        {/* max time */}
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
