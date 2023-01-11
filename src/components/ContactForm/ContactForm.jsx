import React, { Component } from 'react';
import Box from '../Box/Box';
import { PropTypes } from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  saveContact = e => {
    e.preventDefault();
    if (
      this.props.contacts.every(contact => contact.name !== this.state.name)
    ) {
      this.props.onSubmit(this.state);
      this.reset();
    } else {
      alert(`${this.state.name} is already in your contacts`);
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const {
      state: { name, number },
      saveContact,
      handleChange,
    } = this;

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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add contact</button>
      </Box>
    );
  }
}
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
