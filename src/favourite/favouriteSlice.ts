import { createSlice , Middleware} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { movieObj } from '@/components/Hero'
// Define a type for the slice state
interface FavouriteState {
  movies: movieObj[]
}

const getMovieFromLocal = ()=>{
    const local = localStorage.getItem('favmovies')
    return local ? JSON.parse(local) as movieObj[] : []
}
// Define the initial state using that type
const initialState: FavouriteState = {
  movies: getMovieFromLocal(),
}

export const favouriteSlice = createSlice({
  name: 'favourite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action : PayloadAction<movieObj> ) => {
        console.log("--- payload data", action.payload)
      const newMovies = [...state.movies, action.payload];
      state.movies = newMovies;
    },
    remove: (state, action : PayloadAction<number>) => {
      const newMovies = state.movies.filter(movie => movie.id !== action.payload);
      state.movies = newMovies;
    },
  },
})

export const { add, remove } = favouriteSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.favourites.movies

export default favouriteSlice.reducer


export const localStorageSyncMiddleware: Middleware = (store) => (next) => (action) => {
  // Invoke the next middleware or the reducer
  const result = next(action);

  // Check if the action matches the 'add' action pattern
  if (add.match(action) || remove.match(action)) {
    // Sync the state with local storage
    const data = store.getState().favourite.movies
    localStorage.setItem('favmovies', JSON.stringify(data));
  }


  return result;
};
