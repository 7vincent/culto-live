import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fixedHeight: {
    height: 240,
  },
  saldoPositivo: {
    color: 'blue',
  },
  saldoNegativo: {
    color: 'red',
  },

}));

export default function Saldo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const marcadores = useSelector(state => state.marcadores.data);


  const saldo = parseFloat(marcadores.recebido.replace(/\R\$/, '')) - parseFloat(marcadores.despesasPagas.replace(/\R\$/, ''));


  const corSaldo = () => {
    if (saldo > 0)
      return classes.saldoPositivo;
    else
      return classes.saldoNegativo;
  }



  return (
    <Paper className={fixedHeightPaper}>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        Saldo
      </Typography>
      <Typography component="h1" variant="h2" className={corSaldo()} noWrap>
        {`R$ ${saldo.toFixed(2)}`}
      </Typography>
      <Typography component="h1" variant="h6" color="inherit" noWrap />
    </Paper >
  );

}

