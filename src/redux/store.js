import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contacts/slice';
// import { filterSlice } from './filter/slice';
import { filtersReducer } from './filter/slice';

export const store = configureStore({
  reducer: {
    [contactsSlice.name]: contactsSlice.reducer,
    filter: filtersReducer,
  },
});