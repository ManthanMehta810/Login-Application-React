import axios from 'axios';

function ApiCall(url, constant, method, token, reqBody, headers) {
  return axios({
    method,
    url: `${url}${constant}`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data: reqBody,
  });
}

export default ApiCall;
