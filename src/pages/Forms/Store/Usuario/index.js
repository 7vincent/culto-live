import React from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import api from '~/services/api';
import TextField from '~/components/Material/CustomTextField';
import PhoneTextField from '~/components/Material/PhoneTextField';
import CustomCheckBox from '~/components/Material/CustomCheckBox';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    padding: '10px',
  },
});

const schema = Yup.object().shape({
  name: Yup.string('Insira um nome válido').required(),
  email: Yup.string()
    .email('Insira um email válido')
    .required(),
  password: Yup.string()
    .required('A senha é um campo obrigatório')
    .min(6),
  telefone: Yup.string().min(11),
  provider: Yup.boolean(),
  admin: Yup.boolean(),
});

export default function Usuario() {
  const classes = useStyles();

  async function handleSubmit(
    { name, email, telefone, password, provider, admin },
    { resetForm }
  ) {
    const telefoneValido = telefone && telefone.replace(/\D/g, '');
    if (
      !telefoneValido ||
      telefoneValido === '' ||
      telefoneValido.length < 11
    ) {
      toast.error('Informe um número de telefone válido.');
    } else {
      try {
        telefone = telefoneValido;
        await api.post('/users', {
          name,
          email,
          telefone,
          password,
          provider,
          admin,
        });

        toast.success('Cadastro realizado com sucesso');
        resetForm();
      } catch (error) {
        toast.error(
          'Ocorreu um erro ao tentar realizar o cadastro, verifique os dados informados e tente novamente'
        );
      }
    }
  }

  return (
    <Grid container justify="center">
      <Grid item md={4}>
        <Paper className={classes.root}>
          <Form schema={schema} onSubmit={handleSubmit}>
            <TextField label="Nome" name="name" required />
            <TextField label="Email" name="email" required />
            <PhoneTextField label="Telefone" name="telefone" required />
            <TextField label="Senha" name="password" type="password" required />
            <CustomCheckBox label="Funcionário" name="provider" />
            <CustomCheckBox label="Administrador" name="admin" />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Salvar
            </Button>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
