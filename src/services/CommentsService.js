import axios from "axios";
export default class CommentsService {
  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api";
  }
  addComment(newComment) {
    return axios.post("gradebooks/" + newComment.gradebook_id + "/comments", newComment);
  }
  getComments(id) {
    return axios.get("gradebooks/" + id);
  }
  getStudents(id) {
    return axios.get("gradebooks/" + id);
  }
  deleteComment(id) {
    return axios.delete("comments/" + id);
  }
}
export const commentsService = new CommentsService();
