import React from 'react';
import { useState } from 'react';
import useStyles from './useStyles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import AsyncSelect from 'react-select/async';
import UserPresenter from 'presenters/UserPresenter';

import UsersRepository from 'repositories/UsersRepository.js';

const UserSelect = ({ error, label, isClearable, isDisabled, isRequired, onChange, value, helperText }) => {
  const [isFocused, setFocus] = useState(false);
  const styles = useStyles();
  const handleLoadOptions = (inputValue) => {
    UsersRepository.index({ q: { firstNameOrLastNameCont: inputValue } }).then((data) => data.items);
  };
  return (
    <>
      <FormControl margin="dense" disabled={isDisabled} focused={isFocused} error={error} required={isRequired}>
        <InputLabel shrink>{label}</InputLabel>
        <div className={styles.select}>
          <AsyncSelect
            cacheOptions
            loadOptions={handleLoadOptions}
            defaultOptions
            getOptionLabel={(user) => UserPresenter.fullName(user)}
            getOptionValue={(user) => user.id}
            isDisabled={isDisabled}
            isClearable={isClearable}
            defaultValue={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

UserSelect.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape(),
  helperText: PropTypes.string,
};

UserSelect.defaultProps = {
  isClearable: false,
  error: false,
  isDisabled: false,
  isRequired: false,
  value: null,
  helperText: '',
};

export default UserSelect;
