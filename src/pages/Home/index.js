import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';

import logoTorre from '~/assets/logo-betel.jpg'; 

import api from '~/services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: "column",
  },
  container: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    //width: '90%',
    marginBottom: 20,
  },
  image: {
    width: 128,
    height: 128,
    
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 100,
  },
}));

const schema = Yup.object().shape({
  responsavel: Yup.string('Insira um nome válido'),
  ativo: Yup.boolean(),
  aluno: Yup.string('Insira um nome válido'),
  serie: Yup.string(),
  numero: Yup.string(),
});

export default function Matriculas() {
  const classes = useStyles();
  const permissoes = useSelector(state => state.roles.permissoes);
  const profile = useSelector(state => state.user.profile);
  const [page, setPage] = useState(0);
  const [paramPage, setParamPage] = useState(`&pagina=0`);
  const [urlRequest, setUrlRequest] = useState(null);
  const [seriesOptions, setSeriesOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [matriculas, setMatriculas] = useState(null);
  const [totalMatriculas, setTotalMatriculas] = useState(0);

  useEffect(() => {
    async function getSeriesOptions() {
      const options = [];
      const response = await api.get('seriesc');
      response.data.map(nivel => {
        options.push({ value: nivel.id, label: nivel.descricao });
      });
      await setSeriesOptions(options);
      setSeries(response.data);
    }

    async function getMatriculas() {
      let rota = 'matriculas/?ativo=1&pagina=0';
      if (!permissoes.provider && !permissoes.admin) {
        rota = `matriculas/?ativo=1&pagina=0&usuario=${profile.id}`;
      }

      const response = await api.get(rota);
      await setMatriculas(response.data.matriculas);
      setTotalMatriculas(response.data.total);
    }

    if (!seriesOptions && (permissoes.admin || permissoes.provider)) {
      getSeriesOptions();
    }

    if (!matriculas) {
      getMatriculas();
    }
  }, [
    matriculas,
    permissoes.admin,
    permissoes.provider,
    profile.id,
    series,
    seriesOptions,
  ]);

 
  return (

    <div className={classes.root}>

      <Grid container spacing={3}>

        <Grid item className={classes.container} xs={12} sm={6} md={4} spacing={2}>

          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={logoTorre} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Igeja Betel Torre
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      João Pessoa - PB
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Domingos: 18h
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Quartas: 20h
                    </Typography>
                  </Grid>
                  <Grid item>
                  <Button variant="contained" style={{backgroundColor:"#E64E1C", color:"#fff", fontWeight:'bold',}}>
                    VER CANAL
                  </Button>
                  </Grid>
                </Grid>
              
              </Grid>

              
            </Grid>
          </Paper>
      </Grid>

      <Grid item className={classes.container} xs={12} sm={6} md={4} spacing={2}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={logoTorre} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                      Igeja Betel Torre
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      João Pessoa - PB
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Domingos: 18h
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Quartas: 20h
                    </Typography>
                  </Grid>
                  <Grid item>
                  <Button variant="contained" style={{backgroundColor:"#E64E1C", color:"#fff", fontWeight:'bold',}}>
                    VER CANAL
                  </Button>
                  </Grid>
                </Grid>
              </Grid>        
            </Grid>
          </Paper>
        </Grid>
        <Grid item className={classes.container} xs={12} sm={6} md={4} spacing={2}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={logoTorre} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                      Igeja Betel Torre
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      João Pessoa - PB
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Domingos: 18h
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Quartas: 20h
                    </Typography>
                  </Grid>
                  <Grid item>
                  <Button variant="contained" style={{backgroundColor:"#E64E1C", color:"#fff", fontWeight:'bold',}}>
                    VER CANAL
                  </Button>
                  </Grid>
                </Grid>
              </Grid>        
            </Grid>
          </Paper>
          </Grid>
          </Grid>
  </div>
  );
}
