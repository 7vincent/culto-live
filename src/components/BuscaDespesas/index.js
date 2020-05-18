import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '~/components/Material/CustomSelect';
import { marcadoresRequest } from '~/store/modules/marcadores/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

  itensBusca: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }

}));

const meses = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
];

export default function BuscaDespesas() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [makeRequest, setMakeRequest] = useState(false);
  const [mesAtual] = useState(new Date().getMonth() + 1);
  const [anoAtual] = useState(new Date().getFullYear());
  const [mesSelected, setMesSelected] = useState(null);
  const [anoSelected, setAnoSelected] = useState(null);
  const [yearOptions, setYearOptions] = useState(null);

  useEffect(() => {

    function getLastYears() {
      const lastYears = [];
      let nextYear = new Date().getFullYear() + 1;
      while (lastYears.length < 5) {
        lastYears.push({
          label: nextYear,
          value: nextYear,
        });

        nextYear -= 1;
      }

      return lastYears;
    }

    if (!yearOptions) {
      setYearOptions(getLastYears());
    }

    if (!makeRequest && mesAtual && anoAtual) {
      dispatch(
        marcadoresRequest({
          mes: mesAtual,
          ano: anoAtual,
        })
      );
      setMakeRequest(true);
    }

    if (!mesSelected) {
      setMesSelected(new Date().getMonth() + 1);
    }

    if (!anoSelected) {
      setAnoSelected(new Date().getFullYear());
    }
  }, [anoAtual, dispatch, makeRequest, mesAtual, yearOptions]);


  return (
    <Grid container className={classes.itensBusca} justify={'flex-start'} alignItems={"center"} spacing={4}>

      <Grid item key={'pesquisa'}>
        <Typography component="h1" variant="h6" color="inherit" >
          Pesquisa
      </Typography>
      </Grid>
      <Grid item key={'mes'}>

        <Select
          label="Mês"
          name="mes"
          options={meses}
          hasSelecione={false}
          optionDefault={mesAtual}

        />
      </Grid>
      <Grid item key={'ano'}>
        {yearOptions && (
          <Select
            label="Ano"
            name="ano"
            options={yearOptions}
            hasSelecione={false}
            optionDefault={anoAtual}

          />
        )}
      </Grid>

      <Grid item key={'submit'} justify={'center'} >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Pesquisar
                </Button>
      </Grid>
    </Grid>
  );
}
