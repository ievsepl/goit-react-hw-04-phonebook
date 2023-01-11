import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Box from './Box/Box';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitForm = data => {
    // console.log(data.name);
    data.id = nanoid();
    this.setState(prev => {
      return { contacts: [...prev.contacts, data] };
    });
  };

  onFilterForm = e => {
    return this.setState({ filter: e.currentTarget.value });
  };

  visibleNamesMethod = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    // console.log(this.state.contacts);
    const localStorageStateContacts = JSON.parse(
      localStorage.getItem('contacts')
    );
    console.log(localStorageStateContacts);
    const contactList = localStorageStateContacts || this.state.contacts;
    this.setState({ contacts: contactList });
    // if (localStorageStateContacts) {
    //   this.setState({ contacts: localStorageStateContacts });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log(prevState.contacts, this.state.contacts);
    }
  }

  render() {
    const {
      state: { contacts, filter },
      onFilterForm,
      onSubmitForm,
      visibleNamesMethod,
      deleteContact,
    } = this;

    const visibleNames = visibleNamesMethod();

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
  }
}

App.propTypes = {
  data: PropTypes.objectOf({
    name: PropTypes.string,
  }),
};
