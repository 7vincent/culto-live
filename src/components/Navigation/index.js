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

const useStyles = makeStyles(theme => ({
  menu: {
    color: '#707070',
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
          <NavLink to="/conta">
            <ListItem button>
              <ListItemIcon>
                <AccountBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.menu} primary="Igreja Betel Torre" />
            </ListItem>
          </NavLink>
        </>
      </div>
    </>
  );
}
