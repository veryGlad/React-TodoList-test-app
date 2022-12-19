import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITodoItem {
  id: string;
  isCompleted: boolean;
  title: string;
}

type SliceState = {
  todoListItems: ITodoItem[];
};

const getTasks: CaseReducer<SliceState> = (state) => {
  const todoListItemsString = localStorage.getItem('todo');
  state.todoListItems = todoListItemsString
    ? JSON.parse(todoListItemsString)
    : [];
  return state;
};

const addTask: CaseReducer<SliceState, PayloadAction<ITodoItem>> = (
  state,
  action
) => {
  state.todoListItems.push(action.payload);
  localStorage.setItem('todo', JSON.stringify(state.todoListItems));
  return state;
};

const editTask: CaseReducer<SliceState, PayloadAction<ITodoItem>> = (
  state,
  action
) => {
  const idx = state.todoListItems.findIndex((i) => i.id === action.payload.id);
  state.todoListItems[idx] = action.payload;
  localStorage.setItem('todo', JSON.stringify(state.todoListItems));
  return state;
};

const deleteTask: CaseReducer<SliceState, PayloadAction<string>> = (
  state,
  action
) => {
  state.todoListItems = state.todoListItems.filter(
    (i) => i.id !== action.payload
  );
  localStorage.setItem('todo', JSON.stringify(state.todoListItems));
  return state;
};

const initialState: SliceState = { todoListItems: [] };

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    GET_TASKS: getTasks,
    ADD_TASK: addTask,
    EDIT_TASK: editTask,
    DELETE_TASK: deleteTask,
  },
});

export const { GET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } =
  todosSlice.actions;

export default todosSlice.reducer;
