import {configureStore, createSlice} from '@reduxjs/toolkit'
import userName from './store/userName'

let stock = createSlice({
    name: 'stock',
    initialState: [10,11,12]
})

let cartproduct = createSlice({
    name: 'cartproduct',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers: {
        plusCount(state, action) {
            let num = state.findIndex((a) => { return a.id === action.payload})
            state[num].count += 1;
        },
        order(state, action) {
            state.push(action.payload);
        }
    }
})
export let {plusCount, order} = cartproduct.actions; 

export default configureStore({
    reducer: {
        userName: userName.reducer,
        stock: stock.reducer,
        cartproduct: cartproduct.reducer
    }
})