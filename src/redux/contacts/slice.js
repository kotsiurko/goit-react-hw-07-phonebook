import { createSlice } from '@reduxjs/toolkit';

import { addContact, deleteContact, requestContacts } from './operations';

const initialState = {
  items: [],
  isLoading: true,
  error: '',
};
const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  // reducers: {},
  extraReducers: builder =>
    builder

      // create contacts
      .addCase(requestContacts.pending, handlePending)
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(requestContacts.rejected, handleRejected)

      // add contact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.items.push({
        //   name: action.payload.name,
        //   phone: action.payload.phone,
        // });
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      // delete contact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, handleRejected),
});

export default contactsSlice;