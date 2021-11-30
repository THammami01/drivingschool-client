import axios from 'axios';

export default class AuthService {
  static baseRoute = '/api/auth';

  static login(loginFormData: any) {
    return axios.post(`${this.baseRoute}/login`, loginFormData);
  }

  static verifyAccessToken(accessToken: string) {
    return axios.get(`${this.baseRoute}/verify-token`, {
      headers: { Authorization: accessToken },
    });
  }
}
