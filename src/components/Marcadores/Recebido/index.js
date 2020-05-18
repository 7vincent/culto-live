import React from 'react';
import {Link} from 'react-router-dom'
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
  recebido: {
    color: '#4caf50',
  },
}));

export default function Recebido() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const marcadores = useSelector(state => state.marcadores.data);

  return (
    <Paper className={fixedHeightPaper}>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        Recebido
      </Typography>
      <Typography component="h1" variant="h2" className={classes.recebido} noWrap>
        {marcadores.recebido}
      </Typography>
      <Typography component="h1" variant="h6" color="inherit" noWrap />
    </Paper>
  );
}
