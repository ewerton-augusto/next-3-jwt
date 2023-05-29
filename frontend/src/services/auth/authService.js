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
};
