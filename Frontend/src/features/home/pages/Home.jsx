import React from 'react'
import "../../shared/global.scss"
import "../../shared/button.scss"
import "../style/home.scss"
import Moodify from '../../expression/components/Moodify'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
// const{song,loading,handleFetchSong} = useSong()
const Home = () => {
  return (
 <>
    <Moodify />
    
 </>
  )
}

export default Home