import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/Check';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import ModalPagamentoMensalidade from '~/components/Modal/Pagamento/Mensalidade';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: '10px',
  },
  table: {
    minWidth: 650,
  },
  pesquisa: {
    padding: '15px',
  },
  menu: {
    width: 200,
  },
  gridCheckBox: {
    display: 'flex',
  },
  titleTable: {
    margin: '15px',
  },
  buttonAdd: {
    margin: '15px',
  },
  mensalidadeAtrasada: {
    color: '#d50000',
    fontWeight: 'bold',
  },
  mensalidadePaga: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  mensalidadeEmDia: {
    color: '#042DFD',
    fontWeight: 'bold',
  },
});

export default function Mensalidades({ match }) {
  const classes = useStyles();
  const { matricula } = match.params;
  const [mensalidades, setMensalidades] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mensalidadePaga, setMensalidadePaga] = useState(null);

  useEffect(() => {
    async function getMensalidades() {
      const response = await api.get(`/mensalidades/${matricula}`);
      await setMensalidades(response.data);
    }

    if (!mensalidades) {
      getMensalidades();
    }
  }, [matricula, mensalidades]);

  async function handleCloseModal() {
    setModalOpen(false);
    const response = await api.get(`/mensalidades/${matricula}`);
    await setMensalidades(response.data);
  }

  async function handleOpenModal(mensalidade) {
    await setMensalidadePaga(mensalidade);
    setModalOpen(true);
  }

  return (
    <>
      <Paper className={classes.root}>
        <Grid container justify="space-between">
          <Typography
            component="h3"
            variant="h5"
            className={classes.titleTable}
          >
            Resultado
          </Typography>
        </Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Discriminação</TableCell>
              <TableCell align="center">Vencimento</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Valor Pago</TableCell>
              <TableCell align="center">Data do Pagamento</TableCell>
              <TableCell align="center">Confirmar Pagamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mensalidades &&
              mensalidades.map(mensalidade => {
                const classe = () => {
                  if (
                    mensalidade.vencimento < new Date() &&
                    !mensalidade.valor_pago
                  ) {
                    return classes.mensalidadeAtrasada;
                  }

                  if (mensalidade.valor_pago) {
                    return classes.mensalidadePaga;
                  }

                  return classes.mensalidadeEmDia;
                };
                return (
                  <TableRow key={mensalidade.id}>
                    <TableCell component="th" scope="row" className={classe()}>
                      {mensalidade.discriminacao}
                    </TableCell>
                    <TableCell align="center" className={classe()}>
                      {format(parseISO(mensalidade.vencimento), 'dd/MM/yyy')}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classe()}
                    >{`R$${mensalidade.valor}`}</TableCell>
                    <TableCell align="center" className={classe()}>
                      {mensalidade.valor_pago
                        ? `R$${mensalidade.valor_pago}`
                        : '-'}
                    </TableCell>
                    <TableCell align="center" className={classe()}>
                      {(mensalidade.pagamento &&
                        format(parseISO(mensalidade.pagamento), 'dd/MM/yyy')) ||
                        '-'}
                    </TableCell>
                    <TableCell align="center" className={classe()}>
                      {(!mensalidade.valor_pago && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenModal(mensalidade)}
                        >
                          <Check />
                        </Button>
                      )) ||
                        ''}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
      {mensalidadePaga && (
        <ModalPagamentoMensalidade
          isOpen={modalOpen}
          handleClose={handleCloseModal}
          mensalidade={mensalidadePaga}
        />
      )}
    </>
  );
}

Mensalidades.propTypes = {
  match: PropTypes.shape().isRequired,
};
