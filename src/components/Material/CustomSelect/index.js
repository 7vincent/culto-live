import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CustomSelect({
  label,
  name,
  options,
  valueSelected,
  required,
  hasSelecione,
  optionDefault,
}) {
  const classes = useStyles();
  const ref = useRef(null);
  const refLabel = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valueX, setValueX] = useState(
    defaultValue === undefined ? optionDefault : defaultValue
  );
  const [labelWidth, setLabelWidth] = useState(0);

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current.childNodes[1],
        path: 'value',
        clearValue: () => {
          setValueX('');
        },
      });
    }
    setLabelWidth(refLabel.current.offsetWidth);
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <FormControl className={classes.formControl} margin="normal">
      <InputLabel ref={refLabel} id="demo-simple-select-outlined-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={valueX}
        onChange={e => {
          setValueX(e.target.value);
          valueSelected(e.target.value);
        }}
        ref={ref}
        labelWidth={labelWidth}
        name={name}
        error={!!error}
        required={required}
      >
        {hasSelecione && (
          <MenuItem value="">
            <em>Selecione</em>
          </MenuItem>
        )}
        {options &&
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape()),
  valueSelected: PropTypes.func,
  hasSelecione: PropTypes.bool,
  optionDefault: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CustomSelect.defaultProps = {
  options: [],
  valueSelected: () => '',
  required: false,
  hasSelecione: true,
  optionDefault: '',
};
