// Architecture Hexagonal
// Ports and Adapters

export const httpClient = async (url, options) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = BASE_URL + url;

  return fetch(API_URL, {
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
      throw new Error(`Please, try again. Error calling the API '${API_URL}'.`);
    });
};
