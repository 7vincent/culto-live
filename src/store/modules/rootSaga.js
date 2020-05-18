import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import serie from './serie/sagas';
import marcadores from './marcadores/sagas';
import roles from './roles/sagas';

export default function* rootSaga() {
  return yield all([auth, user, serie, marcadores, roles]);
}
