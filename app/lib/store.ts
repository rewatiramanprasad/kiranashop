import { configureStore } from '@reduxjs/toolkit'
import ListReducer from './ListSlice'
import CustomerDetailsReducer from './customerDetailsSlice'
export const store = () => {
    return configureStore({
        reducer: {
            list: ListReducer,
            CustomerDetails:CustomerDetailsReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']