import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import logoTorre from '~/assets/logo-betel.jpg'; 
import funcionarios from '~/assets/funcionarios.jpg'; 
import padreZe from '~/assets/padre-ze.jpg'; 

const useStyles = makeStyles(theme => ({
  menu: {
    color: '#707070',
    maxWidth: '200px',
    flexWrap: 'wrap',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <>
      <div>
        <NavLink to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText  className={classes.menu} primary="Canais" />
          </ListItem>
        </NavLink>
        <NavLink to="/aovivo">
          <ListItem button>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText className={classes.menu} primary="Ao Vivo" />
          </ListItem>
        </NavLink>
        <NavLink to="/inscricao-parceiro">
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText className={classes.menu} primary="Seja Parceiro" />
          </ListItem>
        </NavLink>

      </div>
      <div>
        <>
          <Divider />
          <ListSubheader inset>Lista de Canais</ListSubheader>
          <NavLink to="/">
            <ListItem button>
              <ListItemIcon>
              <Avatar alt="Igreja Betel Torre" src={logoTorre} className={classes.small} />
              </ListItemIcon>
              <ListItemText className={classes.menu} primary="Igreja Betel Torre" />
            </ListItem>
          </NavLink>
          <NavLink to="/">
            <ListItem button>
              <ListItemIcon>
              <Avatar alt="Igreja Betel Torre" src={padreZe} className={classes.small} />
              </ListItemIcon>
              <ListItemText className={classes.menu} primary="Igreja Betel Padre Zé" />
            </ListItem>
          </NavLink>
          <NavLink to="/">
            <ListItem button>
              <ListItemIcon>
              <Avatar alt="Igreja Betel Torre" src={funcionarios} className={classes.small} />
              </ListItemIcon>
              <ListItemText className={classes.menu} primary="Igreja Betel Funcionaios II" />
            </ListItem>
          </NavLink>
        </>
      </div>
    </>
  );
}
