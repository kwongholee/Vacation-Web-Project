import {configureStore, createSlice} from '@reduxjs/toolkit'

let userName = createSlice({
    name: 'userName',
    initialState: 'Kim'
})

let stock = createSlice({
    name: 'stock',
    initialState: [10,11,12]
})

let cartproduct = createSlice({
    name: 'cartproduct',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ]
})

export default configureStore({
    reducer: {
        userName: userName.reducer,
        stock: stock.reducer,
        cartproduct: cartproduct.reducer
    }
})