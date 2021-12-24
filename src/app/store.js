import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'
import contractReducer from './contract.js'
export const store = configureStore({
  reducer: {'auth': authReducer,'contract': contractReducer},
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})
