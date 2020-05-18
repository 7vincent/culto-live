import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { marcadoresRequestSuccess } from './actions';

export function* getMarcadores({ payload }) {
  try {
    const { pesquisa } = payload;
    const response = yield call(
      api.get,
      `marcadores/?ano=${pesquisa.ano}&mes=${pesquisa.mes}`
    );

    const { data } = response;

    yield put(marcadoresRequestSuccess(data));
  } catch (err) {
    toast.error(
      'Falha ao se comunicar com o servidor, tente novamente mais tarde'
    );
  }
}

export default all([takeLatest('@marcadores/REQUEST', getMarcadores)]);
