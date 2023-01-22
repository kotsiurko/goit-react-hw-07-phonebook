import { List, ListItem, Title, ParagraphText } from './ContactList.styled';
import { Button } from '../App.styled';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { selectFilter } from 'redux/filter/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <Title>Contact List</Title>
      <List>
        {visibleContacts.map(({ id, name, phone }) => {
          return (
            <ListItem key={id}>
              <div style={{ textAlign: 'left' }}>
                <p>
                  <ParagraphText>Contact name:</ParagraphText> {name}
                </p>
                <p>
                  <ParagraphText>Tel. number:</ParagraphText> {phone}
                </p>
              </div>
              <Button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
