export function deleteCookie(name: string) {
  const cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = cookie;
}

export function createCookie(name: string, value: string) {
  const cookie = name + "=" + value + ";";
  document.cookie = cookie;
}

export function getCookie(name: string) {
  const cookie = document.cookie.split("; ");
  const value = cookie.find((row) => row.startsWith(name))?.split("=")[1];
  return value;
}
