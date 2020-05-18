import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

import logoTorre from '~/assets/logo-betel.jpg'; 
import funcionarios from '~/assets/funcionarios.jpg'; 
import padreZe from '~/assets/padre-ze.jpg'; 

import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const data = [
  {
    img: logoTorre,
    title: "Igreja Betel Torre",
    city: "João Pessoa - PB",
    cultos: [{day: 'Domingo', hour:'18h'}, {day: 'Quartas', hour:'20h'}],
    idChannel: "UCjNjfQPfUSZRz1gTBHYwbKw",
    description: "Maneja bem a palavra da verdade!",
  },
  {
    img: padreZe,
    title: "Igreja Betel Padre Zé",
    city: "João Pessoa - PB",
    cultos: [{day: 'Domingo', hour:'18h'}],
    idChannel: "UCbwL5Nwn67FGiLeM71ncGaQ",
    description: "Maneja bem a palavra da verdade!",
  },
  {
    img: funcionarios,
    title: "Igreja Betel Funcionarios II",
    city: "João Pessoa - PB",
    cultos: [{day: 'Domingo', hour:'18h'}],
    idChannel: "UCAv1YwbPKX88XfmYlWUP69A",
    description: "Maneja bem a palavra da verdade!",
  },

];

export default function Matriculas() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const [channels, setChannels] = useState(data);

  return (

    <div className={classes.root}>

      <Grid container spacing={3}>

      {channels.map(channel =>

        <Grid item className={classes.container} xs={12} sm={6} md={4} spacing={2}>

          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={channel.img} />
                </ButtonBase>
              </Grid>
              <Grid item xs sm md container>
                <Grid item xs container direction="column"  spacing={2}>
                  <Grid item xs styles={{backgroundColor: '#000',}}>
                    <Typography gutterBottom variant="subtitle1">
                      {channel.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    {channel.city}
                    </Typography>
                    
                    {channel.cultos.map(culto => 
                    <Typography variant="body2" gutterBottom>
                      {culto.day} - {culto.hour} 
                    </Typography>
                    )}
                  </Grid>
                  <Grid item>
                  <Button href={`https://www.youtube.com/channel/${channel.idChannel}`} variant="contained" style={{backgroundColor:"#E64E1C", color:"#fff", fontWeight:'bold',}}>
                    VER CANAL
                  </Button>
                  </Grid>
                </Grid>
              
              </Grid>    
              </Grid>
            </Paper>
        </Grid>

      )}
      
      </Grid>
  </div>
  );
}
