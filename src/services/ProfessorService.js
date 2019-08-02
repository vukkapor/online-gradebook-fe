import axios from "axios";

export default class ProfessorService {
  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
  }

  getAll() {
    return axios.get("professors");
  }

  get(id) {
    return axios.get("professors/" + id);
  }

  addProf(professor) {
    return axios.post("professors", professor);
  }

  getByUserId(id) {
    return axios.get("professors/" + id + "/user")
  }

}

export const professorsService = new ProfessorService();
