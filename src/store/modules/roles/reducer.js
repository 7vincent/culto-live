import produce from 'immer';

const INITIAL_STATE = {
  permissoes: {
    provider: false,
    admin: false,
  },
};

export default function roles(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@roles/RESOLVE_ROLES_SUCCESS': {
        draft.permissoes = action.payload;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.permissoes = {
          provider: false,
          admin: false,
        };
        break;
      }
      case '@roles/REHYDRATE': {
        draft.permissoes = action.payload;
        break;
      }
      default:
    }
  });
}
