import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import PhoneMask from '~/components/FieldsFormat/Phone';

export default function PhoneTextField({
  label,
  name,
  fullWidth,
  type,
  required,
  valor,
  valueChanged,
  disabled,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valueX, setValueX] = useState(
    defaultValue === undefined ? valor : defaultValue
  );

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current.childNodes[1].childNodes[0],
        path: 'value',
        clearValue: () => {
          setValueX('');
          valueChanged('');
        },
      });
    }
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <TextField
      margin="normal"
      fullWidth={fullWidth}
      label={label}
      name={name}
      autoFocus
      type={type}
      error={!!error}
      helperText={error}
      value={valor || valueX}
      onChange={e => {
        setValueX(e.target.value);
        valueChanged(e.target.value);
      }}
      ref={ref}
      required={required}
      InputProps={{
        inputComponent: PhoneMask,
      }}
      disabled={disabled}
    />
  );
}

PhoneTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  valor: PropTypes.string,
  valueChanged: PropTypes.func,
  disabled: PropTypes.bool,
};

PhoneTextField.defaultProps = {
  fullWidth: true,
  type: 'text',
  required: true,
  valor: '',
  valueChanged: () => {
    return '';
  },
  disabled: false,
};
