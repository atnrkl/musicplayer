import React from "react";

const LibraryCard = ({
  song,
  id,
  setCurrentSong,
  songs,
  setisPlaying,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const changeSongHandler = async () => {
    //add active state

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    await setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    }
    await setCurrentSong(song);
  };

  return (
    <div
      onClick={changeSongHandler}
      className={`library-card ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt=""></img>
      <div className="song-desc">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};
export default LibraryCard;
