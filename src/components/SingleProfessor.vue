<template>
  <div>
    <img width="200" height="200" :src="professor.img" />
    <p>Name: {{professor.first_name + ' ' + professor.last_name}}</p>
    <p v-if="professor.gradebook">
      Gradebook name:
      <a
        @click="gradebookShow(professor.gradebook.id)"
      >{{ professor.gradebook.name }}</a>
      <br />
      Number of students in that grade: {{professor.gradebook.students.length}}
    </p>
    <p v-else>Not a head teacher</p>
  </div>
</template>

<script>
import { professorsService } from "../services/ProfessorService";
export default {
  data() {
    return {
      professor: {}
    };
  },

  created() {
    let profID = this.$router.currentRoute.params.id;
    professorsService
      .get(profID)
      .then(response => {
        this.professor = response.data;
      })
      .catch(e => {
        alert(e);
      });
  },

  methods: {
    gradebookShow(id) {
      return this.$router.push("/gradebooks/" + id);
    }
  }
};
</script>

<style>
</style>
