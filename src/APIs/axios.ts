import axios from "axios";

// base url to make request to the movie database

const intance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
})

intance.get('/foo-bar')

// https://api.themoviedb.org/3/foo-bar  

export default intance

