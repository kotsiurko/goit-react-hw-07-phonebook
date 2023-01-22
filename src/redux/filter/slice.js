import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  // initialState: { value: '' },
  initialState: '',
  reducers: {
    changeFilter: (state, { payload }) => {
      // state.value = action.payload.value;
      // state.value = action.payload;
      return payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
