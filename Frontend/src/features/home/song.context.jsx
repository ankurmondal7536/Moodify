import { createContext, useState } from 'react';

export const SongContext = createContext()
export const songContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/ankur7536/moodify/songs/_Haaye_Dard_97_viRLKD.mp3",
        "posterUrl": "https://ik.imagekit.io/ankur7536/moodify/posters/_Haaye_Dard_eIwkOK4oQ.jpg",
        "title": "﻿Haaye Dard",
        "artist": "﻿Darshan Raval - Topic",
        "mood": "sad"
    })
    const [loading, setLoading] = useState(false)
    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    )
}