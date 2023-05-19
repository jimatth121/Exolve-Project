import { movieObj } from './Hero'
import { useAppDispatch } from '@/hooks/storehooks';
import { add, remove } from '@/favourite/favouriteSlice'

type CardProps = {
  movie:movieObj; 
}
const MovieCard = ({movie}:CardProps) => {
  
  const dispatch = useAppDispatch();
  const props = movie

  const handleFavClick = ()=>{
      if(movie.favourite){
          dispatch(remove(movie.id))
        }else{
          dispatch(add({...movie, favourite: !movie.favourite}))
        }
        
  }
  
  return (
    <div className='mt-8 w-[100%]'>
      <div className='h-80'>
        {
          !(props.backdrop_path && props.poster_path) ? <div className='text-6xl text-center text-black flex '>
              {props.title?.split(" ")?.map((el) => el[0] ).join(" ")} 
          </div> : 
          <img src={ `https://image.tmdb.org/t/p/original/${ props.backdrop_path ?props. backdrop_path : props.poster_path  }`} alt="" className={`h-full w-full object-cover ${props.backdrop_path? "object-center"  : "object-top"}`} />
        }
  </div>
        <div className='px-4'>

         <div className='flex justify-between items-center pt-2'>
          <p className='font-bold text-sm'>{props.title}</p>
          <div onClick={handleFavClick} className='cursor-pointer'>
          {
            props.favourite?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          }
          </div>
          </div> 
        <span>{props.release_date}</span>
        </div>

    </div>
  )
}

export default MovieCard