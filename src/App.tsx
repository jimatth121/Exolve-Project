import { useState, useEffect } from 'react'
import './App.css'
import Header from '@/components/Header'
import Hero from './components/Hero'
import { movieObj } from './components/Hero'
import Body from '@/components/Body'
import axios from '@/APIs/axios'
import requests from './APIs/requests'
import { useAppSelector } from '@/hooks/storehooks'
import Favourite from './favourite/Favourite'




 export  const checkFav=(favMovies:movieObj[], moviesRes:movieObj[])=>{
      const arrFavId=  favMovies.map((each)=> each.id)
      return   moviesRes.map((each)=> arrFavId.includes(each.id) ? {...each,favourite: true}:{...each,favourite: false})
}

function App() {

  const [movies, setMovies] = useState<movieObj[]>([])
  // const [movieInput, setMovieInput] = useState('')
  const [searchMovie, setSearchMovie] = useState<movieObj[]>([])
  const [movieTitle, setMovieTitle] = useState('')
  const[isOpen, setIsOpen] = useState<boolean>(false)

const favMovies= useAppSelector((state)=>state.favourite.movies)

  useEffect(()=>{
      async function fetchData(){
      console.log('Fetching')
      const request = await axios.get(requests.fetchActionMovies)
      const moviesRes = request.data.results as movieObj[]
      console.log('Original',request)
      setMovies(moviesRes);
      return request
    }
    fetchData();
  },[])

  
  useEffect(()=>{
    async function fetchData(){
        const request = await axios.get(requests.fetchSearchMovies+movieTitle)
        setSearchMovie(request.data.results)    
        return request
    }
    if(movieTitle){
        fetchData();
    }
},[movieTitle])
  
  
  let movieData = !movieTitle ? checkFav(favMovies, movies) : checkFav(favMovies, searchMovie);
  return (
    <div>
      <Favourite isOpen={isOpen} setIsOpen={setIsOpen}/>
    <Header setIsOpen={setIsOpen} />
    <Hero setMovieTitle={setMovieTitle}  movieTitle={movieTitle} />
    {
      movies ?
    <Body 
      data={movieData}
      setSearchMovie={setSearchMovie}  
      setMovie={setMovies} 
      movieTitle={movieTitle} 
      searchMovie={searchMovie} 
      movie={movies}  /> 
      : null
    }
    </div>
  )
}

export default App
