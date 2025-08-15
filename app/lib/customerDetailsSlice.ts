import { createSlice } from "@reduxjs/toolkit";
//list,customer, dues, contact
interface CustomerState { 
    id:number;
    name: string;
    mobile: string;
    dueList: Array<{ id: string; amount: number; date: string; remarks: string }>;
}

const initialState: CustomerState = {
    id: 0,
    name: '',
    mobile: '',
    dueList: []
};
const customerDetailsSlice = createSlice({
    name: 'customerDetails',
    initialState,
    reducers: {
        setId: (state, action) => { 
            const { id } = action.payload;
            state.id = id;
        },
        setCustomerDetails: (state, action) => {
            const { id, name, mobile, dueList } = action.payload;
            state.id = id;
            state.name = name;
            state.mobile = mobile;
            state.dueList = dueList;
        },
        clearCustomerDetails: (state) => {
            state.id = 0;
            state.name = '';
            state.mobile = '';
            state.dueList = [];
        }
    }
});

export const { setId,setCustomerDetails, clearCustomerDetails } = customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;