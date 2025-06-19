import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';
import UserSelect from '../../UserSelect/UserSelect';

import TextField from '@material-ui/core/TextField';

import useStyles from './useStyles';

const Form = ({ errors, onChange, task }) => {
  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });
  const styles = useStyles();
  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });

  return (
    <form className={styles.root}>
      <UserSelect
        label="Author"
        value={task.author}
        onChange={handleChangeSelect('author')}
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <TextField
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        value={task.name}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        value={task.description}
        label="Description"
        required
        multiline
        margin="dense"
      />
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
