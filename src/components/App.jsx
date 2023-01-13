import React, { useState, useEffect, useMemo } from 'react';
import { PropTypes } from 'prop-types';

import Box from './Box/Box';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  const onSubmitForm = data => {
    data.id = nanoid();
    setContacts(prev => [...prev, data]);
  };

  const onFilterForm = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleNamesMethod = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleNames = visibleNamesMethod;

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      fontSize="px"
      color="#010101"
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitForm} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={onFilterForm} />
      <ContactList
        contacts={visibleNames}
        // filter={visibleNames}
        deleteContact={deleteContact}
      />
    </Box>
  );
};

App.propTypes = {
  data: PropTypes.objectOf({
    name: PropTypes.string,
  }),
};
