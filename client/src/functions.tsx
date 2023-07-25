import { stringify } from "querystring";

// export function deleteCookie(name: string) {
//   const cookie = name + "=x; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//   document.cookie = cookie;
// }

// export function deleteAllCookies() {
//   const cookies = document.cookie.split(";");
//   console.log(cookies);
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i];
//     console.log(cookie);
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
//     console.log(name);
//     deleteCookie(name);
//   }
// }

// export function createCookie(name: string, value: string) {
//   const cookie = name + "=" + value + ";";
//   document.cookie = cookie;
// }

// export function getCookie(name: string) {
//   const cookie = document.cookie.split("; ");
//   const value = cookie.find((row) => row.startsWith(name))?.split("=")[1];
//   return value;
// }

export function getProps(props: Readonly<{}>) {
  const props2 = JSON.parse(JSON.stringify(props));
  return props2;
}
