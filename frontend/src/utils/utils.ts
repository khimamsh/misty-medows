export const getSessionToken = () => window.localStorage.getItem('session');

export const setSessionToken = (token: string) => window.localStorage.setItem('session', token);