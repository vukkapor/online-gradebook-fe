import axios from "axios";

export default class GradebookService {
  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
  }

  getAll(currentPage, numberShown) {
    return axios.get(
      "gradebooks?current_page=" + currentPage + "&numberShown=" + numberShown
    );
  }

  get(id) {
    return axios.get("gradebooks/" + id);
  }
  getGradebookByProfessorID(professorID) {
    return axios.get("gradebooks/" + professorID);
  }

  addGradebook(gradebook) {
    return axios.post("gradebooks/", gradebook);
  }

  addComment(comment, id) {
    return axios.post(`gradebooks/${id}/comments`, comment);
  }

  addStudent(student) {
    return axios.post('gradebooks/'+ student.gradebook_id +'/students', student);
  }

  gradebookEdit(id, gradebook) {
    return axios.put(`gradebooks/${id}/edit`, gradebook);
  }
  delete(id) {
    return axios.delete(`gradebooks/${id}`);
  }
}

export const gradebookService = new GradebookService();
