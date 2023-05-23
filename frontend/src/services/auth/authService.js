export const authService = {
  async login({ username, password }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response || response.status !== 200)
      throw new Error("Please, try again. Invalid user and/or password.");

    console.log(response);
  },
};
