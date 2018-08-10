// @flow
import fetchIntercept from 'fetch-intercept';

/* Fetch logic - BEGIN */
const defaultResponseMapping = response =>
  response.text().then(text => (text ? JSON.parse(text) : null));

const defaultRequestOptions = {
  responseMapping: defaultResponseMapping,
  credentials: 'include'
};

export const apiFetch = (resource: string, requestOptions?: any) => {
  const url =
    (process.env.REACT_APP_BACKEND_URL || 'localhost:8080') + '/api' + resource;
  const options = { ...defaultRequestOptions, ...requestOptions };

  return fetch(url, options)
    .then(options.responseMapping)
    .catch(error => {
      if (error instanceof FetchError) console.error('Fetch error', error);
      else {
        //todo: Cover other errors
      }
    });
};
/* Fetch logic - END */

/* Interceptor logic - BEGIN */
const defaultInterceptor = {
  response: response => {
    switch (response.status) {
      case 401:
      case 402: {
        return redirectToLogin(response);
      }
      case 500: {
        //todo: Add Internal Server Error logic
        return Promise.reject(response);
      }
      default: {
        return response;
      }
    }
  }
};

// In case that we get 401, 402 response status
// ignore response and redirect user to backend
const redirectToLogin = response =>
  response
    .text()
    .then(redirectUri => {
      // replace to backend address
      const serverRedirectUri = redirectUri.replace(
        process.env.REACT_APP_FRONTEND_DOMAIN,
        process.env.REACT_APP_BACKEND_DOMAIN
      );
      window.location.href = serverRedirectUri;
    })
    .then(() => {
      throw new FetchError('Redirect to login');
    });

export const registerInterceptor = (interceptor: Interceptor) =>
  fetchIntercept.register(interceptor);

export const registerDefaultInterceptor = () => {
  registerInterceptor(defaultInterceptor);
};
/* Interceptor logic - END */

/* Custom errors - BEGIN */
class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FetchError';
  }
}
/* Custom error - END */
