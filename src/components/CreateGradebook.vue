<template>
  <div class="container mt-4">
    <form class="form-signin" @submit.prevent="createNewGradebook">
      <h2 class="form-signin-heading">Create a new gradebook</h2>
      <input
        v-model="newGradebook.name"
        type="text"
        class="form-control"
        name="nameOfGradebook"
        placeholder="Naziv gradebook-a"
        required
        minlength="2"
        maxlength="255"
        autofocus
      />
      Professor:
      <select
        class="form-control"
        name="professor_id"
        v-model="newGradebook.professor_id"
      >
        <option disabled>No free professor, create a new one</option>
        <option
          :value="professor.id"
          v-for="professor in freeProfessors"
          :key="professor.id"
        >{{professor.first_name}} {{professor.last_name}}</option>
      </select>
      <div class="container" v-if="newGradebook.students">
        Students:
        <div v-for="student in newGradebook.students" :key="student.id">
          <label class="form-control" for="student">{{ student.name }}</label>
          <button
            class="btn btn-danger form-control"
            type="button"
            @click="removeStudent(student)"
          >-</button>
        </div>

        <div class="form-group row">
          <input type="text" class="form-control" v-model="newStudent.name" />
          <button
            class="btn btn-success form-control"
            type="button"
            @click="addStudent()"
          >Add new student</button>
        </div>
      </div>
      <div class="button-group">
        <button
          v-if="editable"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
        >Edit gradebook</button>
        <button v-else class="btn btn-primary" type="submit">Create new gradebook</button>
        <button class="btn btn-primary" type="submit" @click="goToHome">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { professorsService } from "../services/ProfessorService";
import { gradebookService } from "../services/GradebookService";
export default {
  data() {
    return {
      newGradebook: {},
      freeProfessors: [],
      newStudent: {},
      editable: false
    };
  },

  created() {
    professorsService
      .getAll()
      .then(response => {
        this.freeProfessors = response.data.filter(
          professor => !professor.gradebook
        );
      })
      .catch(e => {
        alert(e);
      });
    if (this.$route.params.id) {
      this.editable = true;
      gradebookService
        .get(this.$route.params.id)
        .then(response => {
          this.newGradebook = response.data;
        })
        .catch(e => {
          alert(e);
        });
    }
  },

  methods: {
    createNewGradebook() {
      if (this.editable) {
        gradebookService
          .gradebookEdit(this.newGradebook.id, this.newGradebook)
          .then(() => {
            this.$router.push("/");
          })
          .catch(e => {
            alert(e);
          });
      } else {
        gradebookService
          .addGradebook(this.newGradebook)
          .then(response => {
            this.$router.push("/");
          })
          .catch(e => {
            alert(e);
          });
      }
    },

    addStudent() {
      this.newGradebook.students.push(this.newStudent);
      this.newStudent = {};
    },

    removeStudent({ id }) {
      console.log(id, this.newGradebook.students);
      this.newGradebook.students = this.newGradebook.students.filter(
        student => student.id != id
      );
    },

    goToHome() {
      return this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
