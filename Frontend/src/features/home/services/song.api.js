import axios from 'axios'
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

async function getSong({mood}){
    const response = await api.get(`/api/songs/fetch-song?mood=${mood}`)
    return response.data;
}
export default getSong