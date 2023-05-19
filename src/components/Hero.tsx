import {useState, useEffect} from 'react'
import axios from '@/APIs/axios'
import requests from '@/APIs/requests'


export type movieObj = {
    backdrop_path:string,
    first_air_date:string,
    genre_ids: number[]
    id: number,
    name?: string,
    origin_country: string[],
    original_language: string,
    original_name?: string,
    overview?: string,
    popularity: number,
    poster_path:string,
    vote_average: number,
    vote_count:number
    title?: string,  
    release_date?: string,
    favourite:boolean

}

type Props = {
    setMovieTitle: (val : string)=>void
    movieTitle: string
}

const Hero = ({ setMovieTitle, movieTitle}:Props) => {
    
    const [movie, setMovie] = useState<movieObj>()
    
    

    const handleMovieTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMovieTitle(e.target.value);


      };

    useEffect(()=>{
        async function fetchData(){
        const request = await axios.get(requests.fetchNetflixOriginal)
        console.log('Hero',request)
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length -1)] )    

            return request
        }
        fetchData();
    },[])



    // console.log(searchMovie)

    function truncate(str:string, n:number){
        return str?.length > n ? str.substr(0, n- 1) + "..." : str;
      }
  return (
    <header className='h-[448px] text-white object-cover flex justify-center items-center relative'
    style={{
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundImage:` url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`
    }}
    >
        <div className='px-[30px] pt- h-[190px] w-[1000px] z-40'>
            <input placeholder='Search for your Favourite' onChange={handleMovieTitle} value={movieTitle} className='  w-[100%] rounded-3xl h-16 mb-8 px-5 border-0 border-none  text-2xl bg-white/40 placeholder:text-white text-white ' />
            {/* <h1 className='text-[3rem] font-[800] pb[0.3rem]'>{movie?.title || movie?.name || movie?.original_name}</h1> */}
            <div className='font-bold text-2xl'>
                {movie?.name}
            </div>

            <div className=' leading-[1.3] pt-2 max-w-[360px] h-[80px]'>{truncate(movie?.overview || "", 150)}</div>
        </div>
        <div className='absolute top-0 left-0 w-[100%] h-[100%] bg-gradient-to-t from-transparent to-rgba(37,37,37,0.61) to-black'></div>
    </header>
  )
}

export default Hero