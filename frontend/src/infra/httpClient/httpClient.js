// Architecture Hexagonal
// Ports and Adapters

export const httpClient = async (url, options) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${BASE_URL + url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : null,
  })
    .then(async (response) => {
      return {
        body: await response.json(),
        status: response.status,
      };
    })
    .catch(() => {
      throw new Error("Please, try again. Invalid user and/or password.");
    });
};
