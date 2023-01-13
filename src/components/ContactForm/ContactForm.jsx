import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '../Box/Box';
import { PropTypes } from 'prop-types';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const handleChange = e => {
  //   const { name, value } = e.currentTarget;
  //   if (name === 'name') {
  //     setName(value);
  //   }
  //   if (name === 'number') {
  //     setNumber(value);
  //   }
  // };

  const onChangeName = e => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const onChangeNumber = e => {
    const { value } = e.currentTarget;
    setNumber(value);
  };

  const saveContact = e => {
    e.preventDefault();
    if (contacts.every(contact => contact.name !== name)) {
      onSubmit({ name, number });
      reset();
    } else {
      // alert(`${name} is already in your contacts`);
      toast.warn(`${name} is already in your contacts`);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="end"
      as="form"
      onSubmit={saveContact}
    >
      <label>
        Name :
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChangeName}
        />
      </label>
      <label>
        Number :
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChangeNumber}
        />
      </label>

      <button type="submit">Add contact</button>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
