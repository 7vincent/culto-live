import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  seriesRequestSuccess,
  addSerieSuccess,
  removeSerieSuccess,
} from './actions';

export function* getSeries() {
  try {
    const response = yield call(api.get, `seriesc`);

    const { data } = response;

    yield put(seriesRequestSuccess(data));
  } catch (err) {
    toast.error(
      'Falha ao se comunicar com o servidor, tente novamente mais tarde'
    );
  }
}

export function* addSerie({ payload }) {
  try {
    const { descricao, valor, faixa_etaria } = payload;
    const response = yield call(api.post, 'series', {
      descricao,
      valor,
      faixa_etaria,
    });

    const { data } = response;

    yield put(addSerieSuccess(data));
    toast.success('Série salva com sucesso');
  } catch (err) {
    toast.error(
      'Falha ao se comunicar com o servidor, tente novamente mais tarde'
    );
  }
}

export function* removeSerie({ payload }) {
  try {
    yield call(api.delete, `series/${payload.nivel}`);

    yield put(removeSerieSuccess(payload));
    toast.success('Série removida com sucesso');
  } catch (err) {
    toast.error(
      'Falha ao se comunicar com o servidor, tente novamente mais tarde'
    );
  }
}

export default all([
  takeLatest('@serie/SERIES_REQUEST', getSeries),
  takeLatest('@serie/ADD_SERIE', addSerie),
  takeLatest('@serie/REMOVE_SERIE', removeSerie),
]);
