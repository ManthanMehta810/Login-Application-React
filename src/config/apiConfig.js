const apiConfig = {
  currentEnv: 'dev',
  prod: '',
  staging: '',
  dev: 'http://192.168.29.151:8000',
  getStatus: { url: '/v1/getStatus', method: 'post' },
  uploadImageToS3: { url: '/v1/uploadImageToS3', method: 'post' },
  signUp: { url: '/v1/signUp', method: 'post' },
  getUserData: { url: '/v1/getUserData', method: 'post' },
  login: { url: '/v1/login', method: 'post' },
  updateUser: { url: '/v1/updateUser', method: 'post' },
};

export default apiConfig;
