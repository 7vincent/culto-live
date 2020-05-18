import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import api from '~/services/api';
import { updateSerieSuccess } from '~/store/modules/serie/actions';
import TextField from '~/components/Material/CustomTextField';
import MoneyTextField from '~/components/Material/MoneyTextField';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
});

const schema = Yup.object().shape({
  descricao: Yup.string('Insira um nome válido').required(),
  valor: Yup.string('O valor é um campo obrigatório').required(),
  faixa_etaria: Yup.string(),
});

export default function Serie({ match }) {
  const { id } = match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  //const series = useSelector(state => state.serie.data);
  const [serie, setSerie] = useState(null);

  useEffect(() => {

    async function getSerie() {
      const response = await api.get(`/serie/${id}`);
      await setSerie(response.data);
    }
    /*
        if (!serie) {
          series.map(nivel => {
            if (nivel.id === parseInt(id)) {
              setSerie(nivel);
            }
          });
        }
        */
    if (!serie) {
      getSerie();
    }
  }, [id, serie]);

  async function handleSubmit({ descricao, faixa_etaria, valor }) {
    try {
      const valorFormatado = valor.replace(/R\$/g, '');
      const response = await api.put(`series/${id}`, {
        descricao,
        valor: valorFormatado,
        faixa_etaria,
      });
      dispatch(updateSerieSuccess(response.data));
      toast.success('Série atualizada com sucesso');
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao salvar as alterações, verifique os dados informados'
      );
    }
  }

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.root}>
        {serie && (
          <Form schema={schema} onSubmit={handleSubmit} initialData={serie}>
            <TextField label="Descrição" name="descricao" required />
            <TextField
              label="Faixa Etária"
              name="faixa_etaria"
              required={false}
            />
            <MoneyTextField label="Valor" name="valor" required />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Salvar Alterações
            </Button>
          </Form>
        )}
      </Paper>
    </Grid>
  );
}

Serie.propTypes = {
  match: PropTypes.shape().isRequired,
};
