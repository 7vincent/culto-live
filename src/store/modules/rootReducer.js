import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import serie from './serie/reducer';
import marcadores from './marcadores/reducer';
import roles from './roles/reducer';
import usuarios from './usuarios/reducer';

export default combineReducers({
  auth,
  user,
  serie,
  marcadores,
  roles,
  usuarios,
});
