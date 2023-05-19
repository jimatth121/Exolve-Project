import { useAppSelector } from '@/hooks/storehooks'
import MovieCard from '@/components/MovieCard'

type Props = {
    setIsOpen:(val:boolean)=>void
    isOpen:boolean
}

const Favourite = (props: Props) => {
    const movies = useAppSelector((state)=> state.favourite.movies)
    const {isOpen, setIsOpen} = props
  return (
    <div className={`w-[100%] bg-[rgba(235,_207,_178,_0.5)] h-screen fixed z-[100] flex justify-end transition-all ${isOpen?'left-0':"left-[100%]"}`}>
      <div className='w-[100%] md:w-[50%] lg:w-[35%] bg-white right-0 h-screen'>
        <div className='flex justify-end pt-4 px-4'>
        <button onClick={()=>setIsOpen(false)} className='text-black'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
        </div>
        <div>
            <h2 className='text-black text-center font-bold text-2xl'>My Favourite List</h2>
        </div>
        <hr className=' mt-4'/>
        <div>{movies.length <1 ? <h2 className='text-lg font-bold text-center mt-8 px-4'>You currently don't have items in your favourite list 😔</h2>: ''}</div>
        <div className='grid sm:grid-cols-[1fr_1fr] px-4 gap-3'>{
           movies.map((each)=>  <MovieCard movie={each} />  )
            }</div>
    </div>
    </div>
  )
}

export default Favourite