export function seriesRequest() {
  return {
    type: '@serie/SERIES_REQUEST',
  };
}

export function seriesRequestSuccess(data) {
  return {
    type: '@serie/SERIES_REQUEST_SUCCESS',
    payload: data,
  };
}

export function addSerie(data) {
  return {
    type: '@serie/ADD_SERIE',
    payload: data,
  };
}

export function addSerieSuccess(data) {
  return {
    type: '@serie/ADD_SERIE_SUCCESS',
    payload: data,
  };
}

export function removeSerie(data) {
  return {
    type: '@serie/REMOVE_SERIE',
    payload: data,
  };
}

export function removeSerieSuccess(data) {
  return {
    type: '@serie/REMOVE_SERIE_SUCCESS',
    payload: data,
  };
}

export function updateSerieSuccess(data) {
  return {
    type: '@serie/UPDATE_SERIE_SUCCESS',
    payload: data,
  };
}
