import { createSlice } from "@reduxjs/toolkit";

let userName = createSlice({
  name: 'userName',
  initialState: {name: 'Kim', age: 20},
  reducers: {
      changeName(state) {
          state.name = "john Kim";
      },
      changeAge(state, action) {
          state.age += action.payload;
      }
  }
})
export let {changeName, changeAge} = userName.actions

export default userName;