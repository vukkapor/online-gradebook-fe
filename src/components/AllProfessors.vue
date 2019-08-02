<template>
  <div>
    <form class="form-inline">
      <input
        class="form-control"
        type="search"
        placeholder="Filter by professors name"
        aria-label="Filter"
        style="margin-top: 10px;width:50%; margin-left: auto;
  margin-right: auto;"
        v-model="searchName"
      />
    </form>
    <hr />
    <ul>
      <li v-for="professor in filteredProfessors" :key="professor.id">
        <router-link :to="singleProfessor(professor.id)">
          <img width="200" :src="professor.img" />
          <br />
          {{professor.first_name + ' ' + professor.last_name}}
          <br />
        </router-link>
        <div v-if="professor.gradebook">
          <router-link :to="singleGradebook(professor.gradebook.id)">{{professor.gradebook.name}}</router-link>
        </div>
        <div v-else>Not a headteacher</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { professorsService } from "../services/ProfessorService.js";
export default {
  data() {
    return {
      professors: [],
      searchName: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      professorsService.getAll().then(response => {
        vm.professors = response.data;
      });
    });
  },

  computed: {
    filteredProfessors() {
      return this.professors.filter(
        professor =>
          professor.first_name
            .toLowerCase()
            .includes(this.searchName.toLowerCase()) ||
          professor.last_name
            .toLowerCase()
            .includes(this.searchName.toLowerCase())
      );
    }
  },

  methods: {
    singleProfessor(id) {
      return `teachers/${id}`;
    },

    singleGradebook(id) {
      return `/gradebooks/${id}`;
    }
  }
};
</script>

