import fetchRequest from './fetchRequest';
import qs from 'query-string';

const http = {
  get(url: string, data={}) {
    return new Promise((resolve, reject) => {
      fetchRequest
        .get(url, {
          params: data
        })
        .then((res: any) => {
          resolve(res)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  post(url: string, data={}, config = {}) {
    return new Promise((resolve, reject) => {
      fetchRequest
        .post(url, data, {...config})
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  patch(url: string, data={}, config = {}) {
    return new Promise((resolve, reject) => {
      fetchRequest
        .patch(url, data, {...config})
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  put(url: string, data={}, config = {}) {
    return new Promise((resolve, reject) => {
      fetchRequest
        .put(url, data, {...config})
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  fetch(url: string, data={}, config?: RequestInit) {
    const query = qs.stringify(data);
    return fetch(`${url}?${query}`,config);
  },
}

export default http;
