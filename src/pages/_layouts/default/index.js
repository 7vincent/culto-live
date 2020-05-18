import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ItensNav from '~/components/Navigation';
import { signOut } from '~/store/modules/auth/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import Search from '~/components/Search';

import logo from '~/assets/logo.svg'

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-sround',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'between',
    padding: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 36,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profile: {
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  search:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 800,
  }

}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.54)',
    },
    success: {
      main: '#2e7d32',
    },
  },
});

export default function DefaultLayout({ children }) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const [open, setOpen] = React.useState(true);


  useEffect(() => {
    setOpen(matches);
  }, [matches]);


  const titulo = rota => {
    if (rota.includes('matriculas')) {
      return 'Matrículas';
    }

    if (rota.includes('series')) {
      return 'Séries';
    }

    if (rota.includes('-matricula')) {
      const newRota = rota.replace(/-matricula/, ' Matrícula');
      return newRota;
    }

    if (rota.includes('-serie')) {
      const newRota = rota.replace(/-serie/, ' Série');
      return newRota;
    }

    if (rota.includes('-usuario')) {
      const newRota = rota.replace(/-usuario/, ' Usuário');
      return newRota;
    }

    if (rota.includes('-despesa')) {
      const newRota = rota.replace(/-despesa/, ' Despesa');
      return newRota;
    }

    if (rota.includes('matricula')) {
      const newRota = rota.replace(/matricula/, 'Editar Matrícula');
      return newRota;
    }

    if (rota.includes('serie')) {
      const newRota = rota.replace(/serie/, 'Editar Série');
      return newRota;
    }

    if (rota === 'usuarios') {
      return 'Usuários';
    }

    if (rota === 'usuario') {
      return 'Usuário';
    }

    return rota;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // function handleSignOut(data) {
  //   dispatch(signOut(data));
  // }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >

          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <Search />
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >

          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon  />
            </IconButton>
          <img src={logo} alt="Culto Online" />

          </div>


          <Divider />
          
          <List>
            <ItensNav />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} justify="center">
              {children}
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
