import React from "react";
import LibraryCard from "./LibraryCard";

const Library = ({
  songs,
  setCurrentSong,
  setisPlaying,
  audioRef,
  isPlaying,
  setSongs,
  isLibOpen,
}) => {
  return (
    <div className={`library ${isLibOpen ? "library-open" : ""}`}>
      <h1>Song Library</h1>
      <div className="library-song">
        {songs.map((song) => (
          <LibraryCard
            setSongs={setSongs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setisPlaying={setisPlaying}
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
