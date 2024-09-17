import { httpClient } from "../../infra/httpClient/httpClient";
import { accessTokenService } from "./tokenService";

export const authService = {
  async login({ username, password }) {
    const response = await httpClient("/api/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });
    // set access token
    accessTokenService.set(response?.body?.data?.access_token || "");
    return response;
  },

  async getSession(ctx = null){
    const token = accessTokenService.get(ctx);
    const response = await httpClient("/api/session", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if(response.status !== 200) throw new Error("Error getting the session.");
    return response.body.data;
  }
};
