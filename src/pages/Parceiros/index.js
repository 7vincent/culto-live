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
    minWidth: '300px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    padding: '10px',
  },

});

export default function Mensalidades({ match }) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Grid container justify="space-between">
          <Typography
            component="h3"
            variant="h5"
            className={classes.titleTable}
          >
            Clique no botão abaixo para começar a preencher os dados, nosso serviço é gratuito!
          </Typography>
          
        </Grid>
        <Button href="https://docs.google.com/forms/d/e/1FAIpQLSd60j_zQsbKzeVDWjr6btk92pvKTiY75OMYjHLiV8j1wppikQ/viewform?usp=sf_link" variant="contained" style={{backgroundColor:"#E64E1C", color:"#fff", fontWeight:'bold',}}>
                    VER CANAL
                  </Button>
        
      </Paper>
    </>
  );
}

Mensalidades.propTypes = {
  match: PropTypes.shape().isRequired,
};
