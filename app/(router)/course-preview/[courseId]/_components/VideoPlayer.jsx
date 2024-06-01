import React from 'react';
import './VideoPlayer.css'; // Import the CSS file

function VideoPlayer({ videoUrl, poster }) {
  console.log(videoUrl);
  return (
    <div className="video-player-container">
      <video
        className="video-player"
        controls
        key={videoUrl}
        poster={poster}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;
