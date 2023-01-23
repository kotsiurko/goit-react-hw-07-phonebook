import { ListItem, ParagraphText } from './ContactList.styled';
import { Button } from '../App.styled';
import { deleteContact } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    setIsDeleting(true);

    dispatch(deleteContact(id)).then(res => {
      if (res.error) {
        setIsDeleting(false);
      }
    });
  };

  return (
    <ListItem>
      <div style={{ textAlign: 'left' }}>
        <p>
          <ParagraphText>Contact name:</ParagraphText> {name}
        </p>
        <p>
          <ParagraphText>Tel. number:</ParagraphText> {phone}
        </p>
      </div>
      <Button type="button" onClick={handleClick} disabled={isDeleting}>
        Delete
      </Button>
    </ListItem>
  );
};
