import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import api from '~/services/api';
import TextField from '~/components/Material/CustomTextField';
import MoneyTextField from '~/components/Material/MoneyTextField';
import CustomCheckBox from '~/components/Material/CustomCheckBox';
import Select from '~/components/Material/CustomSelect';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
});

const schema = Yup.object().shape({
  valor_mensalidade: Yup.string().required(
    'O valor da mensalidade é um campo obrigatório'
  ),
  nivel_id: Yup.number().required('A série é um campo obrigatório'),
  aluno: Yup.string('Insira um nome válido').required(
    'O nome do aluno é um campo obrigatório'
  ),
  ativo: Yup.bool().required(),
  dia_vencimento: Yup.number().required(
    'O dia do vencimento é um campo obrigatório'
  ),
});

export default function Matricula({ match }) {
  const { id } = match.params;
  const classes = useStyles();
  const [matricula, setMatricula] = useState(null);
  const [series, setSeries] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState(null);
  const [valorSerie, setValorSerie] = useState('');

  useEffect(() => {
    async function getMatricula() {
      const response = await api.get(`/matricula/${id}`);
      await setMatricula(response.data);
    }

    async function getSeriesOptions() {
      const options = [];
      const response = await api.get('seriesc');
      response.data.map(nivel => {
        options.push({ value: nivel.id, label: nivel.descricao });
      });
      await setSeriesOptions(options);
      setSeries(response.data);
    }

    if (!seriesOptions) {
      getSeriesOptions();
    }

    if (!matricula) {
      getMatricula();
    }
  }, [id, matricula, seriesOptions]);

  async function handleSubmit({
    valor_mensalidade,
    nivel_id,
    aluno,
    ativo,
    dia_vencimento,
  }) {
    valor_mensalidade = valor_mensalidade.replace(/R\$/, '');
    try {
      await api.put(`matricula/${id}`, {
        valor_mensalidade,
        nivel_id,
        aluno,
        ativo,
        dia_vencimento,
      });
      toast.success('Matrícula atualizada com sucesso');
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao salvar as alterações, verifique os dados informados'
      );
    }
  }

  function serieSelected(valor) {
    if (valor === '') {
      setValorSerie('');
      return;
    }

    series.map(serie => {
      if (serie.id === valor) {
        setValorSerie(serie.valor);
      }
    });
  }

  function valorModificado(valor) {
    setValorSerie(valor);
  }

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.root}>
        {matricula && (
          <Form schema={schema} onSubmit={handleSubmit} initialData={matricula}>
            {seriesOptions && (
              <Select
                label="Série"
                name="nivel_id"
                required
                options={seriesOptions}
                valueSelected={serieSelected}
              />
            )}
            <TextField label="Aluno" name="aluno" required />
            <MoneyTextField
              label="Mensalidade"
              name="valor_mensalidade"
              required
              valor={valorSerie}
              valueChanged={valorModificado}
            />
            <TextField
              label="Vencimento"
              name="dia_vencimento"
              type="number"
              required
            />
            <CustomCheckBox label="Ativo" name="ativo" />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Salvar Alterações
            </Button>
          </Form>
        )}
      </Paper>
    </Grid>
  );
}

Matricula.propTypes = {
  match: PropTypes.shape().isRequired,
};
