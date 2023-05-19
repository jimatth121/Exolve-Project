import { configureStore, Middleware } from '@reduxjs/toolkit'
import favouriteSlice from '@/favourite/favouriteSlice'
import {localStorageSyncMiddleware} from "@/favourite/favouriteSlice"
// ...

export const store = configureStore({
  reducer: {
    favourite: favouriteSlice ,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(localStorageSyncMiddleware as Middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch