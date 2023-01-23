import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { addContact, deleteContact, requestContacts } from './operations';

const extraActions = [addContact, deleteContact, requestContacts];

const getActions = type => extraActions.map(action => action[type]);

const initialState = {
  items: [],
  isLoading: true,
  error: '',
};
const handlePending = (state) => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  // reducers: {},
  extraReducers: builder =>
    builder

      // create contacts
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.items = action.payload;

      })

      // add contact
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // delete contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })

      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected)
});

export default contactsSlice;