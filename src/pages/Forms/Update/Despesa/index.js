import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import DatePicker from '~/components/Material/CustomDatePicker';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
});

const schema = Yup.object().shape({
  descricao: Yup.string().required('Selecione uma série'),
  valor: Yup.string('O valor é um campo obrigatório').required(),
  data: Yup.string('A data é um campo obrigatório'),
  observacao: Yup.string(),
  pago: Yup.bool(),
});

export default function Despesa({ match }) {
  const { id } = match.params;
  const classes = useStyles();
  const [despesa, setDespesa] = useState(null);
  const [despesaPaga, setDespesaPaga] = useState(false);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {

    async function getDespesa() {
      const response = await api.get(`/despesa/${id}`);
      await setDespesa(response.data);
    }

    getDespesa();


  }, []);



  async function handleSubmit({
    descricao,
    valor,
    data,
    observacao,
    pago,
  }) {
    const valorFormatted = valor && valor.replace(/R\$/g, '');
    const dataSplited = data && data.split(/\//);
    const dataFormatted =
      dataSplited && `${dataSplited[2]}-${dataSplited[1]}-${dataSplited[0]}`;

    try {
      await api.put(`despesa/${id}`, {
        descricao,
        valor: valorFormatted,
        data: dataFormatted,
        observacao,
        pago,
        user_id: profile.id,
      });
      toast.success('Despesa atualizada com sucesso');
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao salvar as alterações, verifique os dados informados'
      );
    }
  }
  function changeDespesaPaga(valor) {
    setDespesaPaga(valor);
  }

  return (

    < Grid container justify="center" >
      <Grid item md={6}>
        <Paper className={classes.root}>
          {despesa && (
            <Form schema={schema} onSubmit={handleSubmit} initialData={despesa}>
              <Grid container>
                <Grid item xs={12} className={classes.input}>
                  <TextField label="Descrição" name="descricao" required />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                  <MoneyTextField label="Valor" name="valor" required />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                  <DatePicker label="Data da Despesa" name="data" />
                </Grid>
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    label="Observação"
                    name="observacao"
                    required={false}

                  />
                </Grid>
                <Grid item xs={12} className={classes.input}>
                  <CustomCheckBox
                    label="Despesa Paga"
                    name="pago"
                  />
                </Grid>
                <Grid item xs={12} className={classes.input}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Salvar Alteração
              </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Paper>
      </Grid>
    </Grid >
  );
}

Despesa.propTypes = {
  match: PropTypes.shape().isRequired,
};
