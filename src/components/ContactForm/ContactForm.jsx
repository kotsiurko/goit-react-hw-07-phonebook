import { useState } from 'react';
import {
  Form,
  Title,
  LabelGroup,
  LabelTitle,
  Input,
} from './ContactForm.styled';
import { Button } from '../App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { toast } from 'react-toastify';
// import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    if (name === 'name') {
      setName(value);
    } else {
      setPhone(value);
    }
  };

  const onFormSubmit = event => {
    event.preventDefault();

    const isInContacts = contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      toast.info(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    dispatch(addContact(newContact));

    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <div>
      <Title>Add contact</Title>

      <Form onSubmit={onFormSubmit}>
        <LabelGroup>
          <label htmlFor="">
            <LabelTitle>Name:</LabelTitle>
            <Input
              onChange={handleChange}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor="">
            <LabelTitle>Number:</LabelTitle>
            <Input
              onChange={handleChange}
              value={phone}
              type="tel"
              name="phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </LabelGroup>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};
