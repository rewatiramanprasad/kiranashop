import { createSlice } from '@reduxjs/toolkit'

interface Item {
    id: number;
    name: string;
    amount: number;
    mobile: number;
    createAt: Date;
}

interface FilterListState {
    data: Item[];
    searchTerm: string;
}

const FilterListSlice = createSlice({
    name: 'filterList',
    initialState: {
        data: [] as Item[],
        searchTerm: ''
    } as FilterListState,
    reducers: {
        setFilterList: (state, action) => {
            state.data = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
})

export const { setFilterList, setSearchTerm } = FilterListSlice.actions;
export default FilterListSlice.reducer;