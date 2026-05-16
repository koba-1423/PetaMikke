export const LOCAL_AUTH_USERS_KEY = "petamikke_auth_users";
export const LOCAL_AUTH_SESSION_KEY = "petamikke_auth_session";

export type LocalAuthUser = {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

export type LocalAuthSession = {
  userId: string;
  email: string;
  username: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAuthUsers() {
  if (!isBrowser()) return [] as LocalAuthUser[];
  try {
    const raw = window.localStorage.getItem(LOCAL_AUTH_USERS_KEY);
    if (!raw) return [];
    const users = JSON.parse(raw) as LocalAuthUser[];
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export function writeAuthUsers(users: LocalAuthUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_AUTH_USERS_KEY, JSON.stringify(users));
}

export function readAuthSession() {
  if (!isBrowser()) return null as LocalAuthSession | null;
  try {
    const raw = window.localStorage.getItem(LOCAL_AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalAuthSession;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: LocalAuthSession) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}
