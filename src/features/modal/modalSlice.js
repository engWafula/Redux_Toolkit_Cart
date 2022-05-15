import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isOpen:false
}

const cartSlice=createSlice({
    initialState,
    name:'modal',
    reducers:{
        openModal:(state,action)=>{
            state.isOpen=true
        },

        closeModal:(state,action)=>{
            state.isOpen=false
        }
    }
})

export const{openModal,closeModal} =cartSlice.actions

export default cartSlice.reducer