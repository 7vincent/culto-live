import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { toast } from 'react-toastify';
import api from '~/services/api';
import TextField from '~/components/Material/CustomTextField';
import MoneyTextField from '~/components/Material/MoneyTextField';
import Select from '~/components/Material/CustomSelect';
import PhoneTextField from '~/components/Material/PhoneTextField';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
  divider: {
    margin: '15px 0',
  },
  input: {
    padding: theme.spacing(1),
  },
}));

const schema = Yup.object().shape({
  serie: Yup.string().required('Selecione uma série'),
  mensalidade: Yup.string('A mensalidade é um campo obrigatório').required(),
  vencimento: Yup.string(
    'O dia do vencimento é um campo obrigatório'
  ).required(),
  ano: Yup.string('O ano letivo é um campo obrigatório').required(),
  aluno: Yup.string('O aluno é um campo obrigatório').required(),
  responsavel: Yup.string('O responsável é um campo obrigatório').required(),
  email: Yup.string('O email é um campo obrigatório').required(),
  telefone: Yup.string('O telefone é um campo obrigatório').required(),
});

export default function Matricula() {
  const classes = useStyles();
  const [valorSerie, setValorSerie] = useState('');
  const [valorMatricula, setValorMatricula] = useState('');
  const [seriesOptions, setSeriesOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [hasSerieSelected, setHasSerieSelected] = useState(false);
  const [anoOptions, setAnoOptions] = useState(null);

  useEffect(() => {
    async function getSeriesOptions() {
      const options = [];
      const response = await api.get('seriesc');
      response.data.map(nivel => {
        options.push({ value: nivel.id, label: nivel.descricao });
      });
      setSeriesOptions(options);
      setSeries(response.data);
    }

    if (!seriesOptions) {
      getSeriesOptions();
    }

    if (!anoOptions) {
      const anos = [
        {
          label: new Date().getFullYear() + 1,
          value: new Date().getFullYear() + 1,
        },
      ];

      if (new Date().getMonth() < 5) {
        anos.push({
          label: new Date().getFullYear(),
          value: new Date().getFullYear(),
        });
      }

      setAnoOptions(anos);
    }
  }, [anoOptions, series, seriesOptions]);

  function handleSubmit(
    {
      serie,
      mensalidade,
      vencimento,
      ano,
      aluno,
      responsavel,
      email,
      telefone,
    },
    { resetForm }
  ) {
    const telefoneValido = telefone && telefone.replace(/\D/g, '');
    const valor = mensalidade.replace(/R\$/g, '');
    if (
      !telefoneValido ||
      telefoneValido === '' ||
      telefoneValido.length < 11
    ) {
      toast.error('Informe um número de telefone válido.');
    } else {
      telefone = telefoneValido;
      api
        .post('/matricula', {
          serie,
          valor_matricula: valorMatricula,
          mensalidade: valor,
          vencimento,
          ano,
          aluno,
          responsavel,
          email,
          telefone,
        })
        .then(() => {
          toast.success('Matrícula realizada com sucesso');
          resetForm();
        })
        .catch(() => {
          toast.error(
            'Ocorreu um erro ao tentar realizar a matrícula, tente novamente mais tarde'
          );
        });
    }
  }

  function serieSelected(valor) {
    if (valor === '') {
      setValorSerie('');
      setValorMatricula('');
      setHasSerieSelected(false);
      return;
    }

    series.map(serie => {
      if (serie.id === valor) {
        setValorSerie(serie.valor);
        setValorMatricula(serie.valor);
        setHasSerieSelected(true);
      }
    });
  }

  function valorModificado(valor) {
    setValorSerie(valor);
  }

  return (
    <Grid container justify="center">
      <Grid item md={6}>
        <Paper className={classes.root}>
          <Form schema={schema} onSubmit={handleSubmit}>
            <Grid container>
              <Typography>Dados da Matrícula</Typography>
              <Grid item xs={12} className={classes.input}>
                <Select
                  label="Série"
                  name="serie"
                  required={false}
                  options={seriesOptions}
                  valueSelected={serieSelected}
                  hasSelecione
                />
              </Grid>
              {(valorSerie || hasSerieSelected) && (
                <>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <MoneyTextField
                      label="Mensalidade"
                      name="mensalidade"
                      required
                      valor={valorSerie}
                      valueChanged={valorModificado}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      label="Dia do Vencimento"
                      name="vencimento"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <Select
                      label="Ano Letivo"
                      name="ano"
                      required={false}
                      options={anoOptions}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {(valorSerie || hasSerieSelected) && (
              <>
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container>
                  <Typography>Dados do Aluno</Typography>
                  <Grid item xs={12} className={classes.input}>
                    <TextField label="Aluno" name="aluno" required />
                  </Grid>
                  <Grid item xs={12} className={classes.input}>
                    <TextField
                      label="Responsável"
                      name="responsavel"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField label="Email do Responsável" name="email" />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <PhoneTextField label="Telefone" name="telefone" />
                  </Grid>
                  <Grid item xs={12} className={classes.input}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Adicionar
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
