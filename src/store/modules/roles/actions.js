export function resolveRolesRequest(token) {
  return {
    type: '@roles/RESOLVE_ROLES_REQUEST',
    payload: { token },
  };
}

export function resolveRolesSuccess(admin, provider) {
  return {
    type: '@roles/RESOLVE_ROLES_SUCCESS',
    payload: { admin, provider },
  };
}
