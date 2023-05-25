import { httpClient } from "../../infra/httpClient/httpClient";

export const authService = {
  async login({ username, password }) {
    return await httpClient("/api/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });
  },
};
