import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";


const url = 'https://course-api.com/react-useReducer-cart-project';


const initialState={
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}


export const getItems=createAsyncThunk('cart/getItems',async(name,thunkAPI)=>{
    try {
        const res =await axios(url)
      console.log(thunkAPI)
      console.log(thunkAPI.getState())
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[]
        },
        removeItem:(state,action)=>{
            const itemId=action.payload
            state.cartItems=state.cartItems.filter((item)=>
                item.id!==itemId
            )
        },
        increase:(state,action)=>{
            const itemId=action.payload;
            const cartItem=state.cartItems.find((item)=>item.id===itemId);
            cartItem.amount=cartItem.amount+1;

        },
        decrease:(state,action)=>{
            const itemId=action.payload;
            const cartItem=state.cartItems.find((item)=>item.id===itemId)
            cartItem.amount=cartItem.amount-1
        },
        calculateTotals:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item)=>{
                amount +=item.amount//amount=amount+item.amount
                total += item.amount*item.price//total=total+item.amount*item.price

            })
            state.amount=amount
            state.total=total
        }
    },
    extraReducers:{
        [getItems.pending]:(state)=>{
            state.isLoading=true;
        },
        [getItems.fulfilled]:(state,action)=>{
            console.log(action)
            state.isLoading= false
            state.cartItems=action.payload
        },
        [getItems.rejected]:(state,action)=>{

            console.log(action)
            state.isLoading=false
        }
    }
});

//console.log(cartSlice);
export const {clearCart,removeItem,increase,decrease,calculateTotals}=cartSlice.actions
export default cartSlice.reducer;