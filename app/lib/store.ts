import { configureStore } from '@reduxjs/toolkit'
import ListReducer from './ListSlice'
import CustomerDetailsReducer from './customerDetailsSlice'
import FilterListReducer from './FilterListSlice'
import contactReducer from './contactSlice'
export const store = () => {
    return configureStore({
        reducer: {
            list: ListReducer,
            CustomerDetails: CustomerDetailsReducer,
            filterList: FilterListReducer,
            contact:contactReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']