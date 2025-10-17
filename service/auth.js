const sessionIdToMap = new Map();

export function setUser(id, user) {
  sessionIdToMap.set(id, user);
}

export function getUser(id) {
  return sessionIdToMap.get(id);
}
