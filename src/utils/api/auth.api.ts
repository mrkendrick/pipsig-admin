import api from './axios';

class AuthenticationApi {
  async login(data: { username: string; password: string }) {
    return api.post('/auth/login', data);
  }

  async signup(data: { name: string; email: string; password: string }) {
    return api.post('/auth/signup', data);
  }

  async getProfile() {
    return api.get('/auth/user');
  }

  async updateProfile(data: { name: string; photo: string }) {
    return api.patch('/auth/user', data);
  }

  async updatePassword(data: { currentPassword: string; newPassword: string }) {
    return api.patch('/auth/updatePassword', data);
  }
}

const AuthenticationApiService = new AuthenticationApi();

export default AuthenticationApiService;
