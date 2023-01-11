import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import Box from '../Box/Box';
import ContactItem from '../ContactItem/ContactItem';

class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(contact => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              deleteContact={this.props.deleteContact}
            />
          );
        })}
      </ul>
    );
  }
}

export default ContactList;

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
