import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from '~/components/Material/CustomSelect';
import { marcadoresRequest } from '~/store/modules/marcadores/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',

  },
  fixedHeight: {
    height: 240,
  },
  item: {
    marginLeft: '20px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500
  },

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

export default function Parametros() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [makeRequest, setMakeRequest] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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

  async function handleChangeMes(mes) {
    dispatch(
      marcadoresRequest({
        mes,
        ano: anoSelected,
      })
    );
    setMesSelected(mes);
  }

  async function handleChangeAno(ano) {
    dispatch(
      marcadoresRequest({
        mes: mesSelected,
        ano,
      })
    );
    setAnoSelected(ano);
  }

  return (
    <Paper className={fixedHeightPaper}>
      <Typography component="h1" variant="h6" color="inherit" >
        Pesquisa
      </Typography>
      <div className={classes.item}>
        <Select
          label="Mês"
          name="mes"
          fullwidth={false}
          options={meses}
          hasSelecione={false}
          optionDefault={mesAtual}
          valueSelected={handleChangeMes}
        />

        {yearOptions && (
          <Select
            label="Ano"
            name="ano"
            fullwidth={false}
            options={yearOptions}
            hasSelecione={false}
            optionDefault={anoAtual}
            valueSelected={handleChangeAno}
          />
        )}
      </div>
    </Paper>
  );
}
