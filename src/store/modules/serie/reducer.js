import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function serie(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@serie/SERIES_REQUEST_SUCCESS': {
        draft.data = action.payload;
        break;
      }
      case '@serie/ADD_SERIE_SUCCESS': {
        draft.data.push(action.payload);
        break;
      }
      case '@serie/UPDATE_SERIE_SUCCESS': {
        draft.data.map((serieHandle, index) => {
          if (serieHandle.id === action.payload.id) {
            draft.data[index] = action.payload;
          }
        });
        break;
      }
      case '@serie/REMOVE_SERIE_SUCCESS': {
        draft.data.map((serieHandle, index) => {
          if (serieHandle.id === action.payload.nivel) {
            draft.data.splice(index, 1);
          }
        });
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
