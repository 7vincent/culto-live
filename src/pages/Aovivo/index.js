import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


//import logoAlgo from '~/assets/algo.png';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    minWidth: '300px',
    minHeight: '100px',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));


export default function SignIn() {

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
      <Typography
        variant="h6"
        align="center"
      >
        Agora não temos nenhum Ao vivo.
      </Typography>
      </Paper>
    </Container>
  );
}
