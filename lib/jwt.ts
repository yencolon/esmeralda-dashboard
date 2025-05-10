import { jwtDecode, JwtPayload } from "jwt-decode";


export const isExpiredToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    const expirationTime = decoded?.exp ?? 0;
    const nowTimeMs = Date.now()
    const expirationTimeInMs = expirationTime * 1000;
    return nowTimeMs >= expirationTimeInMs;
  } catch {
    return false;
  }

}
export const isAdminToken = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload & { rol: string }>(token);
    return decoded.rol === 'admin';
  } catch {
    return false;
  }
}