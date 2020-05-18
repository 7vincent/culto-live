import { takeLatest, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

import AuthConfig from '~/config/AuthConfig';

import { resolveRolesSuccess } from './actions';

export function* resolveRoles({ payload }) {
  try {
    const { token } = payload;
    const { admin, provider } = jwt.verify(token, AuthConfig.secret);
    yield put(resolveRolesSuccess(admin, provider));
  } catch (err) {
    toast.error(
      'Falha na autenticação, verifique seus dados ou aguarde a ativação da conta'
    );
  }
}

export function* resolveRolesRehydrate({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (!token) return;

  const { admin, provider } = jwt.verify(token, AuthConfig.secret);
  yield put(resolveRolesSuccess(admin, provider));
}

export default all([
  takeLatest('persist/REHYDRATE', resolveRolesRehydrate),
  takeLatest('@roles/RESOLVE_ROLES_REQUEST', resolveRoles),
]);
