import produce from 'immer';

const INITIAL_STATE = {
  data: {
    receber: 'R$0.00',
    recebido: 'R$0.00',
    despesasPagas: 'R$0.00',
    despesasAbertas: 'R$0.00',
    ano: null,
    mes: null,
  },
};

export default function marcadores(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@marcadores/REQUEST': {
        draft.data.ano = action.payload.pesquisa.ano;
        draft.data.mes = action.payload.pesquisa.mes;
        break;
      }
      case '@marcadores/REQUEST_SUCCESS': {
        draft.data.receber = action.payload.receber;
        draft.data.recebido = action.payload.recebido;
        draft.data.despesasPagas = action.payload.despesaspagas;
        draft.data.despesasAbertas = action.payload.despesasabertas;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.data = {
          receber: 'R$0.00',
          recebido: 'R$0.00',
          despesasPagas: 'R$0.00',
          despesasAbertas: 'R$0.00',
        };
        break;
      }
      default:
    }
  });
}
