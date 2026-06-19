type CookieOptions = {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  if (typeof window === "undefined") return;

  const {
    expires = 365,
    path = "/",
    domain,
    secure = false,
    sameSite = "lax",
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += "; secure";
  }

  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }

  return null;
}

export function removeCookie(name: string, path = "/") {
  if (typeof window === "undefined") return;

  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}
