import AbstractBaseApiService, { ServiceType } from "@services/baseapi";

class Auth extends AbstractBaseApiService {
  public static instance: Auth;
  static _endpoints = {
    login: "/auth/login/",
    register: "/auth/register/",
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

  async register(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password2: string
  ) {
    const endpoint = this.withParams(this.endpoints.register);
    const data = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(data);

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
