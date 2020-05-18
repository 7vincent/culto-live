import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

import logoTorre from '~/assets/logo-betel.jpg'; 

//import api from '~/services/api';

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


export default function Matriculas() {
  const classes = useStyles();

 
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
              <Grid item xs={12} sm md container>
                <Grid item xs container direction="column"  spacing={2}>
                  <Grid item xs styles={{backgroundColor: '#000',}}>
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
