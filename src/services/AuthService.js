import axios from "axios";

export default class AuthService {
  constructor() {
    this.setAxiosDefaultAuthorizationHeader();
    this.user = {};
  }

  login(email, password) {
    return axios
      .post("http://localhost:8000/api/login", {
        email,
        password
      })
      .then(data => {
        window.localStorage.setItem("loginToken", data.data.token);
        window.localStorage.setItem("user", JSON.stringify(data.data.user));
        this.setAxiosDefaultAuthorizationHeader();
        return data;
      });
  }

  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem("loginToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
  }

  logout() {
    window.localStorage.removeItem("loginToken");
    delete axios.defaults.headers.common["Authorization"];
  }

  isAuthenticated() {
    return !!window.localStorage.getItem("loginToken");
  }

  register(user) {
    return axios
      .post("http://localhost:8000/api/register", user)
      .then(() => {
        this.login(user.email, user.password);
      })
      .catch($e => {
        alert($e);
      });
  }

  getFreeProfessors() {
    return axios.get("http://localhost:8000/api/users");
  }
}

export const authService = new AuthService();
