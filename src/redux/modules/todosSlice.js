import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';
import { nanoid } from '@reduxjs/toolkit';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()

    return payload
  }
);


export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()

    return payload
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload)
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todos) => todos.id !== action.payload)
    },
  },
  extraReducers: {
    [__addToDo.fulfilled]: (state, action) => {
      state.list.push({
        id:nanoid(),
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.list = state.list.filter((todos) => todos.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
