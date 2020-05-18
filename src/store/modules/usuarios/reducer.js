import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function usuarios(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@usuarios/REQUEST_SUCCESS': {
        draft.data = action.payload;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.data = null;
        break;
      }
      default:
    }
  });
}
