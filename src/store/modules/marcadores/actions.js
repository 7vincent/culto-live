export function marcadoresRequest(pesquisa) {
  return {
    type: '@marcadores/REQUEST',
    payload: { pesquisa },
  };
}

export function marcadoresRequestSuccess(data) {
  return {
    type: '@marcadores/REQUEST_SUCCESS',
    payload: data,
  };
}
