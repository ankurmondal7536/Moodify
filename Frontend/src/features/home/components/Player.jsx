import React, { useRef, useState, useEffect } from 'react';
import "../../shared/global.scss"
import "../../shared/button.scss"
import "../style/player.scss"

// import { useSong } from "../hooks/useSong"



const Player = ({ songs = [] }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const currentSong = songs.length > 0 ? songs[currentSongIndex] : null;

    // Update current time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            if (currentSongIndex < songs.length - 1) {
                setCurrentSongIndex(currentSongIndex + 1);
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentSongIndex, songs.length]);

    // Update playback speed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    // Play/Pause effect
    useEffect(() => {
        if (audioRef.current && currentSong) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
        }
    };

    const handleNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
            setIsPlaying(true);
        }
    };

    const handlePreviousSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
            setIsPlaying(true);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="player-container">
            {currentSong && (
                <>
                    <audio
                        ref={audioRef}
                        src={currentSong.songUrl || currentSong.url}
                        crossOrigin="anonymous"
                    />

                    <div className="player-header">
                        {currentSong.posterUrl && (
                            <img
                                src={currentSong.posterUrl}
                                alt={currentSong.title}
                                style={{ width: '150px', height: '150px', borderRadius: '10px', marginBottom: '10px' }}
                            />
                        )}
                        <h3 className="song-title">{currentSong.title || 'Unknown Song'}</h3>  {/* name → title */}
                        <p className="song-artist">{currentSong.artist || 'Unknown Artist'}</p>
                    </div>

                    <div className="player-progress">
                        <span className="time">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleProgressChange}
                            className="progress-bar"
                        />
                        <span className="time">{formatTime(duration)}</span>
                    </div>

                    <div className="player-controls">
                        <button className="control-btn prev-btn" onClick={handlePreviousSong} title="Previous Song">
                            ⏮
                        </button>

                        <button className="control-btn play-btn" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>

                        <button className="control-btn forward-btn" onClick={handleForward} title="Forward 10s">
                            ⏩
                        </button>

                        <button className="control-btn next-btn" onClick={handleNextSong} title="Next Song">
                            ⏭
                        </button>
                    </div>

                    <div className="player-settings">
                        <div className="speed-control">
                            <label htmlFor="speed-select">Speed:</label>
                            <select
                                id="speed-select"
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                                className="speed-select"
                            >
                                <option value={0.5}>0.5x</option>
                                <option value={1}>1x</option>
                                <option value={1.25}>1.25x</option>
                                <option value={1.5}>1.5x</option>
                                <option value={2}>2x</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            {!currentSong && (
                <div className="player-empty">
                    <p>No songs available. Upload songs to start playing!</p>
                </div>
            )}
        </div>
    );
};

export default Player;