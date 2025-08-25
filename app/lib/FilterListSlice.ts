import { createSlice } from '@reduxjs/toolkit'

interface Item {
  id: number
  name: string
  amount: number
  mobile: number
  createAt: Date
}

interface FilterListState {
  data: Item[]
  searchTerm: string
  contactSearchTerm: string
}

const FilterListSlice = createSlice({
  name: 'filterList',
  initialState: {
    data: [] as Item[],
    searchTerm: '',
    contactSearchTerm: '',
  } as FilterListState,
  reducers: {
    setFilterList: (state, action) => {
      console.log("its me filter list slice",action.payload)
      state.data = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setContactSearchTerm: (state, action) => {
      state.contactSearchTerm = action.payload
    },
  },
})

export const { setContactSearchTerm, setFilterList, setSearchTerm } =
  FilterListSlice.actions
export default FilterListSlice.reducer
