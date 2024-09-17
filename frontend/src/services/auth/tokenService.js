import nookies from "nookies";
const JWT_AUTHAPP_ACCESS_TOKEN_KEY = "JWT_AUTHAPP_TOKEN_KEY";

export const accessTokenService = {
  set(token, ctx = null) {
    nookies.set(ctx, JWT_AUTHAPP_ACCESS_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[JWT_AUTHAPP_ACCESS_TOKEN_KEY] || "";
  },
  delete(ctx = null) {
    nookies.destroy(ctx, JWT_AUTHAPP_ACCESS_TOKEN_KEY);
  },
};
