import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import 'date-fns';
import ptBr from 'date-fns/locale/pt';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { toast } from 'react-toastify';

export default function DatePicker({
  label,
  name,
  fullWidth,
  required,
  disabled,
  valor,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valueX, setValueX] = useState(new Date());
  const [valorEditar, setValorEditar] = useState(valor);

  if (error) {
    console.log(error);
    toast.error(error);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current.childNodes[0].childNodes[1].childNodes[0],
        path: 'value',
        clearValue: () => {
          setValueX(new Date());
        },
      });
    }
  }, [ref.current, fieldName]); //eslint-disable-line

  const handleDateChange = date => {
    setValueX(date);
    setValorEditar(null);

  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBr}>
      <Grid container justify="space-around" ref={ref}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={label}
          format="dd/MM/yyyy"
          value={valorEditar ? valorEditar : valueX}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          required={required}
          name={name}
          fullWidth={fullWidth}
          disabled={disabled}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  valor: PropTypes.string,
};

DatePicker.defaultProps = {
  fullWidth: false,
  required: false,
  disabled: false,
};
