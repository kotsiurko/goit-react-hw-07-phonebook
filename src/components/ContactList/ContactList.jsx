import { List, Title } from './ContactList.styled';

import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { selectFilter } from 'redux/filter/selectors';
import { ContactItem } from './ContactItem';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

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
        {visibleContacts.map(contact => {
          return <ContactItem key={contact.id} {...contact} />;
        })}
      </List>
    </div>
  );
};
