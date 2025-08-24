import { createSlice } from '@reduxjs/toolkit'

interface List {
  id: string
  name: string
  amount: number
  mobile: number
  updateAt: string
}

const ListSlice = createSlice({
  name: 'list',
  initialState: {
    data: [] as List[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    setList: (state, action) => {
      state.data = action.payload
    },
  },
})
export const { setList } = ListSlice.actions
export default ListSlice.reducer
