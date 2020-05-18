import React, { useState } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import DatePicker from '~/components/Material/CustomDatePicker';
import api from '~/services/api';
import TextField from '~/components/Material/CustomTextField';
import CustomCheckBox from '~/components/Material/CustomCheckBox';
import MoneyTextField from '~/components/Material/MoneyTextField';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
  input: {
    padding: theme.spacing(1),
  },
}));

const schema = Yup.object().shape({
  descricao: Yup.string().required('Selecione uma série'),
  valor: Yup.string('O valor é um campo obrigatório').required(),
  data: Yup.string('A data é um campo obrigatório'),
  observacao: Yup.string(),
  pago: Yup.bool(),
});

export default function Despesa() {
  const classes = useStyles();

  function handleSubmit(
    { descricao, valor, data, observacao, pago },
    { resetForm }
  ) {
    const valorFormatted = valor && valor.replace(/R\$/g, '');
    const dataSplited = data && data.split(/\//);
    const dataFormatted =
      dataSplited && `${dataSplited[2]}-${dataSplited[1]}-${dataSplited[0]}`;

    api
      .post('/despesa', {
        descricao,
        valor: valorFormatted,
        data: dataFormatted,
        observacao,
        pago,
      })
      .then(() => {
        toast.success('Despesa cadastrada com sucesso');
        resetForm();
      })
      .catch(() => {
        toast.error(
          'Ocorreu um erro ao tentar cadastrar a despesa, tente novamente mais tarde'
        );
      });
  }

  return (
    <Grid container justify="center">
      <Grid item md={6}>
        <Paper className={classes.root}>
          <Form schema={schema} onSubmit={handleSubmit}>
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
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
