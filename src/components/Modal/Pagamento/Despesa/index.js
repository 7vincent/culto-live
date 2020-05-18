import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
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


export default function Pagamento({ isOpen, handleClose, despesa }) {
  const classes = useStyles();

  async function handleSubmit() {

    await api
      .put(`/pagar-despesa/${despesa.id}`)
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
            className={classes.paper}
          >
            <h2 id="transition-modal-title">Confirmar Pagamento</h2>
            <TextField
              label="Data despesa"
              name="data"
              disabled
              valor={
                despesa &&
                format(parseISO(despesa.data), 'dd/MM/yyy')
              }
              required={false}
            />
            <TextField
              label="Descrição"
              name="descricao"
              disabled
              valor={despesa && despesa.descricao}
              required={false}
            />
            <TextField
              label="Observação"
              name="observacao"
              disabled
              valor={despesa && despesa.observacao}
              required={false}
            />
            <MoneyTextField
              label="Valor"
              name="valor"
              disabled
              valor={despesa && despesa.valor}
              required={false}
            />
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
