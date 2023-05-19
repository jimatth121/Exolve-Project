import { movieObj } from "./Hero"
import MovieCard from "./MovieCard"
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks"
import { checkFav } from "@/App"
import {useEffect} from "react";

type Props = {
    movie : movieObj[];
    data: movieObj[];
    movieTitle: string;
    searchMovie: movieObj[] | undefined;
    setSearchMovie: (value : movieObj[]) => void;
    setMovie : (value : movieObj[]) => void; 

}
const Body = (props : Props) => {
    const { data, movie, movieTitle, searchMovie, setSearchMovie, setMovie} = props
    const favMovies= useAppSelector((state)=>state.favourite.movies)

   

    useEffect(() => {
        const newInitialFavM = checkFav(favMovies, movie) 
       setMovie(newInitialFavM)
        if(searchMovie) {
            const newSearchFavM = checkFav(favMovies, searchMovie);  
            setSearchMovie(newSearchFavM)
        }
    }, [favMovies]);
    
    
    
  return (
    
    data?.length < 1 ?  <h1 className="text-3xl mt-20 text-center">Movie Not Found 😔</h1> :
         
    <div className="grid lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] mt-4 px-4 sm:px-8 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] mb-20">
       { data?.map((each) =>  (<MovieCard  movie={each}  />))}
    </div>

      )
}

export default Body

// const [cost] = useState<number>()