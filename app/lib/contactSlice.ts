import { createSlice } from "@reduxjs/toolkit"

interface item {
    name: string
    mobile: number
    id: number
}

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        data: [] as item[],
    },
    reducers: {
        setContacts: (state, action) => {
            state.data = action.payload;
        }
    }
}
)

export const { setContacts } = contactSlice.actions;
export default contactSlice.reducer;