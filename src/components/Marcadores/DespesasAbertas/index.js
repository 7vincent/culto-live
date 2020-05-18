import React from 'react';
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
  despesasAbertas: {
    color: 'red',
  },
}));

export default function DespesasAbertas() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const marcadores = useSelector(state => state.marcadores.data);

  return (
    <Paper className={fixedHeightPaper}>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        Despesas Abertas
      </Typography>
      <Typography component="h1" variant="h2" className={classes.despesasAbertas} noWrap>
        {marcadores.despesasAbertas}
      </Typography>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        {(parseFloat(marcadores.despesasAbertas.replace(/\R\$/, '')) > 0) && (<Link to="/despesas">Despesas</Link>)}

      </Typography>
    </Paper>
  );
}
