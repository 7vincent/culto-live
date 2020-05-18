import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AttachMoneyOutlined from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { updateSerieSuccess } from '~/store/modules/serie/actions';
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
  name: Yup.string('O nome é um campo obrigatório').required(),
  email: Yup.string('O email é um campo obrigatório').required(),
  telefone: Yup.string('O telefone é um campo obrigatório').required(),
  admin: Yup.bool(),
  provider: Yup.bool(),
});

export default function Usuario({ match }) {
  const { id } = match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios.data);
  const permissoes = useSelector(state => state.roles.permissoes);
  const [usuario, setUsuario] = useState(null);
  const [matriculas, setMatriculas] = useState(null);

  useEffect(() => {
    async function getMatriculas() {
      const response = await api.get(
        `matriculas/?ativo=1&usuario=${id}&pagina=0`
      );
      setMatriculas(response.data.matriculas);
    }

    if (!usuario) {
      usuarios.map(usuarioHandle => {
        if (usuarioHandle.id === parseInt(id)) {
          setUsuario(usuarioHandle);
        }
      });
    }

    if (!matriculas) {
      getMatriculas();
    }
  }, [id, matriculas, usuario, usuarios]);

  async function handleSubmit({ descricao, valor }) {
    try {
      const valorFormatado = valor.replace(/R\$/g, '');
      const response = await api.put(`series/${id}`, {
        descricao,
        valor: valorFormatado,
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
    <>
      <Grid item xs={12} md={4}>
        <Paper className={classes.root}>
          {usuario && (
            <Form schema={schema} onSubmit={handleSubmit} initialData={usuario}>
              <TextField label="Nome" name="name" required />
              <TextField label="Email" name="email" required />
              <PhoneTextField label="Telefone" name="telefone" required />
              <CustomCheckBox
                label="Funcionário"
                name="provider"
                valor={usuario.provider}
              />
              <CustomCheckBox
                label="Administrador"
                name="admin"
                valor={usuario.admin}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Salvar Alterações
              </Button>
            </Form>
          )}
        </Paper>
      </Grid>
      {matriculas && matriculas.length > 0 && (
        <Grid item xs={12} md={8}>
          <Paper className={classes.root}>
            <Grid container justify="space-between">
              <Typography
                component="h3"
                variant="h5"
                className={classes.titleTable}
              >
                Matrículas
              </Typography>
            </Grid>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Responsável</TableCell>
                  <TableCell align="right">Aluno</TableCell>
                  <TableCell align="right">Série</TableCell>
                  <TableCell align="right">Mensalidade</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Histórico</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matriculas &&
                  matriculas.map(matricula => (
                    <TableRow key={matricula.id}>
                      <TableCell component="th" scope="row">
                        {matricula.user.name}
                      </TableCell>
                      <TableCell align="right">{matricula.aluno}</TableCell>
                      <TableCell align="right">
                        {matricula.nivel.descricao}
                      </TableCell>
                      <TableCell align="right">
                        R$ {matricula.valor_mensalidade}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/matricula/${matricula.id}`}>
                          <Button variant="contained" color="primary">
                            <EditOutlined />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/mensalidades/${matricula.id}`}>
                          <Button variant="contained" color="primary">
                            <AttachMoneyOutlined />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      )}
    </>
  );
}

Usuario.propTypes = {
  match: PropTypes.shape().isRequired,
};
