import AbstractBaseApiService, { ServiceType } from "@services/baseapi";

class Auth extends AbstractBaseApiService {
  public static instance: Auth;
  static _endpoints = {
    login: "/login/",
  };

  constructor(data?: ServiceType) {
    super();
    if (!Auth.instance) {
      Auth.instance = this.initialize(data);
    }

    return Auth.instance;
  }

  async login(username: string, password: string) {
    const endpoint = this.withParams(this.endpoints["login"]);
    const data = {
      username: username,
      password: password,
    };

    return this.api.post<any>(endpoint, data);
  }

  setToken(token: string) {
    localStorage.setItem("chat_login_token", token);
  }

  get token(): string | null {
    return localStorage.getItem("chat_login_token") ?? null;
  }
}

const AuthService = new Auth();
export default AuthService;
