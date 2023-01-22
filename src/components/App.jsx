// import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { Container } from './App.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { requestContacts } from 'redux/contacts/operations';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook App</h1>
      <ContactForm />
      {isLoading && !error && <div>Loading...</div>}
      {contacts.length > 0 ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <p>Please, add contact</p>
      )}
    </Container>
  );
};
