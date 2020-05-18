import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import DatePicker from '~/components/Material/CustomDatePicker';
import TextField from '~/components/Material/CustomTextField';
import MoneyTextField from '~/components/Material/MoneyTextField';
import api from '~/services/api';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #444',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
}));

const schema = Yup.object().shape({
  valor_pago: Yup.string().required('O valor pago é um campo obrigatório.'),
  data_pagamento: Yup.string().required(
    'A data de pagamento é um campo obrigatório.'
  ),
});

export default function Pagamento({ isOpen, handleClose, mensalidade }) {
  const classes = useStyles();

  async function handleSubmit({ valor_pago, data_pagamento }) {
    valor_pago = valor_pago.replace(/R\$/, '');
    const dataSplited = data_pagamento.split(/\//);
    data_pagamento = `${dataSplited[2]}-${dataSplited[1]}-${dataSplited[0]}`;

    await api
      .put(`/mensalidade/${mensalidade.id}`, {
        valor_pago,
        data_pagamento,
      })
      .then(() => {
        toast.success('Pagamento confirmado com sucesso.');
        handleClose();
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao confirmar o pagamento.');
      });
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div>
          <Form
            onSubmit={handleSubmit}
            schema={schema}
            className={classes.paper}
          >
            <h2 id="transition-modal-title">Confirmar Pagamento</h2>
            <TextField
              label="Vencimento"
              name="vencimento"
              disabled
              valor={
                mensalidade &&
                format(parseISO(mensalidade.vencimento), 'dd/MM/yyy')
              }
              required={false}
            />
            <MoneyTextField
              label="Valor"
              name="valor"
              disabled
              valor={mensalidade && mensalidade.valor}
              required={false}
            />
            <MoneyTextField
              label="Valor Pago"
              name="valor_pago"
              valor={mensalidade && mensalidade.valor}
            />
            <DatePicker label="Data de Pagamento" name="data_pagamento" />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Confirmar
              </Button>
            </div>
          </Form>
        </div>
      </Fade>
    </Modal>
  );
}

Pagamento.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  mensalidade: PropTypes.shape().isRequired,
};

Pagamento.defaultProps = {
  isOpen: false,
};
