import { createSlice } from '@reduxjs/toolkit'

interface List {
  id: string
  name: string
  amount: number
  mobile: number
  update: string
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
      // console.log('its me filter list slice', action.payload)
      state.data = action.payload
      // .data.map((item: List) => ({ id: item.id, name: item.name, amount: item.amount, mobile: item.mobile, update: new Date(item.update).toISOString() }))
    },
  },
})
export const { setList } = ListSlice.actions
export default ListSlice.reducer
