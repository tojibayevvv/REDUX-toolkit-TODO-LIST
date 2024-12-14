import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const todoSlice = createSlice({
    name: "todo-list",
    initialState,
    reducers: {
        getData(state, {payload}){
            state.data = [...state.data, {...payload, id: Date.now()}]
        },
        deleteData(state, {payload}){
            state.data = state.data.filter((value)=> value.id !== payload)
        },
        editData(state, {payload}){
            state.data = state.data.map((value) => value.id === payload.id ? {...value, todo: payload.list} : value)
        }
    }
})

export const {getData, deleteData, editData} = todoSlice.actions
export default todoSlice.reducer