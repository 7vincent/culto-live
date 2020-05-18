export function requestSuccess(data) {
  return {
    type: '@usuarios/REQUEST_SUCCESS',
    payload: data,
  };
}
