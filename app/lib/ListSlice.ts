import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { set } from 'zod';

interface List { 
    id: string;
    name: string;
    amount: number;
    date: string;
}

export const fetchList = createAsyncThunk('lists/fetchLists', async () => {
    const response = await fetch('/api/list')
    const data = await response.json()
    console.log(data)
    return data
 })

const ListSlice = createSlice({
    name: 'list',
    initialState: {
        data: [] as List[],
        status: 'idle',
        error: null as string | null
    },
  reducers: {
      setList: (state, action) => {
          state.data = action.payload;
      }
    },
  //   extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchList.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchList.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchList.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message || 'Something went wrong';
  //     });
  // }
})
export const { setList } = ListSlice.actions
export default ListSlice.reducer