import React from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { addSerie } from '~/store/modules/serie/actions';
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

export default function Serie() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleSubmit({ descricao, valor, faixa_etaria }, { resetForm }) {
    const valorFormatado = valor.replace(/R\$/g, '');
    dispatch(addSerie({ descricao, valor: valorFormatado, faixa_etaria }));
    resetForm();
  }

  return (
    <Grid container justify="center">
      <Grid item md={4}>
        <Paper className={classes.root}>
          <Form schema={schema} onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField label="Descrição" name="descricao" required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Faixa Etária"
                  name="faixa_etaria"
                  required={false}
                />
              </Grid>
              <Grid item xs={12}>
                <MoneyTextField label="Valor" name="valor" required />
              </Grid>
              <Grid item xs={12}>
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
