// import Box from '../Box/Box';
import { PropTypes } from 'prop-types';

const Filter = ({ filter, onFilter }) => {
  return (
    <div>
      <label>
        Find contacts by name:
        <input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={filter}
          onChange={onFilter}
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
