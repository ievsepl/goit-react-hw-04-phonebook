import Box from '../Box/Box';
import { PropTypes } from 'prop-types';

const ContactItem = ({ contact: { id, name, number }, deleteContact }) => {
  return (
    <Box border="1px solid red" as="li">
      {name} - {number}
      <button type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </Box>
  );
};
export default ContactItem;

ContactItem.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
