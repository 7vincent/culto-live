import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//import logoAlgo from '~/assets/algo.png';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  powered: {
    marginTop: theme.spacing(3),
    '-webkit-text-stroke-width': '1px' /* largura da borda */,
    '-webkit-text-stroke-color': '#5dbcab',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


export default function SignIn() {

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        variant="subtitle2"
        align="center"
        className={classes.powered}
      >
        Ao vivo
      </Typography>
    </Container>
  );
}
