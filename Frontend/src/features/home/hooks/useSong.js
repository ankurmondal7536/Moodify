import getSong from '../services/song.api';
import { useContext } from 'react';
import { SongContext } from '../song.context';

export const useSong = ()=>{
    const context = useContext(SongContext)
    const {song,setSong,loading,setLoading} = context
    async function handleFetchSong(mood){
        setLoading(true)
        const response = await getSong({mood})
        setSong(response.song)
        console.log(response.song)
        setLoading(false)
    }
    return{
        song,
        loading,
        handleFetchSong
    }
}