<template>
  <div>
    <div v-if="gradebook">
      <h2 v-if="routeName==='my-gradebook'">My Gradebook</h2>
      <div v-if="user.gradebook || routeName!=='my-gradebook'">
        <h2>Gradebook name: {{ gradebook.name }}</h2>
        <div v-if="user">
          <button class="btn btn-danger" @click="deleteGradebook(gradebook.id)">Delete Gradebook</button>
          <button class="btn btn-primary" @click="editGradebook(gradebook.id)">Edit Gradebook</button>
        </div>
        <br />
        <br />
        <div v-if="gradebook.professor">
          Professor:
          <strong>{{gradebook.professor.first_name + ' ' + gradebook.professor.last_name}}</strong>
        </div>
        <div v-else>Professor not assigned for this gradebook.</div>
        <div v-if="user">
          <form class="form-signin" @submit.prevent="addStudents">
            <h2 class="form-signin-heading">Add a new student</h2>

            <input
              v-model="newStudent.first_name"
              type="text"
              class="form-control"
              name="first_name"
              placeholder="First Name"
              required
              autofocus
            />
            <input
              v-model="newStudent.last_name"
              type="text"
              class="form-control"
              name="last_name"
              placeholder="Last Name"
              required
            />
            <input
              v-model="newStudent.img"
              type="text"
              class="form-control"
              name="img"
              placeholder="Image URL"
              required
            />
            <button class="btn btn-primary" @click="addStudents()">Add Student</button>
          </form>
          <div>
            <h3>Students list</h3>
            <div v-if="students">
              <div v-for="student in students">
                <img width="200" :src="student.img" alt />
                {{student.first_name}}
                {{student.last_name}}
                <hr />
              </div>
            </div>
            <div v-else>
              <p>No students to show.</p>
            </div>
          </div>
          <div v-if="commentsList.length > 0">
            <h3>Comments:</h3>
            <div v-for="(comment, index) in commentsList" :key="index">
              <div v-if="comment">
                Author name:
                <h4>{{ comment.first_name + ' ' + comment.last_name }}</h4>Created at:
                <p>{{ comment.created_at}}</p>
                <p>{{ comment.text }}</p>
                <div v-if="user && (user.id === comment.user_id)">
                  <button class="btn btn-danger" @click="deleteComment(index)">Delete Comment</button>
                </div>

                <hr />
              </div>
            </div>
          </div>
          <div v-if="user">
            <label for="commentText">Comment:</label>
            <br />
            <textarea
              width="50%"
              maxlength="1000"
              minlength="1"
              name="commentText"
              v-model="newComment.text"
            />
            <br />
            <button class="btn btn-primary" @click="addComment">Add Comment</button>
          </div>
        </div>
        <div v-if="!gradebook">
          <p>No gradebook to show.</p>
        </div>
      </div>
      <div v-else>This user doesn't have a gradebook</div>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService";
import { commentsService } from "../services/CommentsService";
import { mapGetters } from "vuex";
import { professorsService } from "../services/ProfessorService";

export default {
  data() {
    return {
      gradebook: [],
      comments: [],
      students: [],
      errors: [],
      newComment: {
        content: "",
        user_id: 0,
        gradebook_id: 0,
        first_name: "",
        last_name: ""
      },
      routeName: null,
      newStudent: {}
    };
  },
  created() {
    if (user.gradebook) {
      this.getComments();
      this.getStudents();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routeName = to.name;
      if (vm.routeName === "my-gradebook") {
        professorsService
          .getByUserId(vm.user.id)
          .then(response => {
            if (vm.user.gradebook) {
              vm.gradebook = response.data;
            }
          })
          .catch(e => {
            alert(e);
          });
      } else {
        gradebookService
          .get(vm.$route.params.id)
          .then(response => {
            vm.gradebook = response.data;
          })
          .catch(e => {
            alert(e);
          });
      }
    });
  },

  computed: {
    ...mapGetters({
      user: "AuthModule/getUser"
    }),
    commentsList() {
      return this.comments;
    }
  },

  methods: {
    getDefaults() {
      this.newComment = { text: "" };
    },
    getComments() {
      commentsService
        .getComments(this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.comments = response.data.comments;
        })
        .catch(e => {
          alert(e);
        });
    },
    getStudents() {
      commentsService
        .getStudents(this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.students = response.data.students;
        })
        .catch(e => {
          alert(e);
        });
    },
    addStudents() {
      this.newStudent.gradebook_id = this.gradebook.id;
      console.log(this.newStudent);
      gradebookService
        .addStudent(this.newStudent)
        .then(response => {
          this.students.push(this.newStudent);
          this.newStudent = {};
        })
        .catch(e => {
          alert(e);
        });
    },
    editGradebook(id) {
      return this.$router.push("/gradebooks/" + id + "/edit");
    },
    addComment() {
      this.newComment.user_id = this.user.id;
      this.newComment.gradebook_id = this.gradebook.id;
      commentsService
        .addComment(this.newComment)
        .then(response => {
          this.newComment = response.data;
          this.newComment.first_name = this.user.name;
          this.comments.push(this.newComment);
          this.getDefaults();
        })
        .catch(e => {
          alert(e);
        });
    },

    deleteComment(index) {
      const q = confirm("Confirm");
      if (q) {
        commentsService
          .deleteComment(this.comments[index].id)
          .then(() => {
            this.comments.splice(index, 1);
          })
          .catch(e => {
            alert(e);
          });
      }
    },

    deleteGradebook() {
      const q = confirm("Confirm");
      if (q) {
        gradebookService
          .delete(this.gradebook.id)
          .then(() => {
            return this.$router.push("/");
          })
          .catch(e => {
            alert(e);
          });
      }
    }
  }
};
</script>

