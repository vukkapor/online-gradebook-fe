<template>
  <div>
    <form class="form-inline">
      <input
        class="form-control"
        type="search"
        placeholder="Filter by gradebook name"
        aria-label="Filter"
        style="margin-top: 10px; width:50%; margin-left: auto;
  margin-right: auto;"
        v-model="searchTerm"
      />
    </form>
    <hr />

    <div v-if="gradebooks.length > 0">
      <table class="table" width="100%">
        <thead>
          <tr>
            <th>Gradebook</th>
            <th>Professor</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(gradebook, index) in filteredGradebooks" :key="index">
            <td>
              <button class="btn-link" @click="singleGradebook(gradebook.id)">{{ gradebook.name }}</button>
            </td>
            <td v-if="gradebook.professor_id">
              <div v-if="user">
                <img
                  v-if="gradebook.professor.img"
                  :src="gradebook.professor.img"
                  height="100px"
                  @click="singleProfessor(gradebook.professor_id)"
                />
                <br />
                <button
                  class="btn-link"
                  @click="singleProfessor(gradebook.professor_id)"
                >{{gradebook.professor.first_name + ' ' +gradebook.professor.last_name }}</button>
              </div>
              <div v-else>
                <strong>{{ gradebook.first_name + ' ' + gradebook.last_name }}</strong>
              </div>
            </td>
            <td v-else>No professor for this gradebook</td>
            <td>{{ gradebook.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showMoreExists">
      <button class="btn btn-success" @click="showMore">Show More</button>
    </div>
    <p v-if="filteredGradebooks.length=0">No gradebooks</p>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      gradebooks: [],
      searchTerm: "",
      currentPage: 0,
      numberShown: 10,
      totalNumberOfPages: undefined
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getGradebooks();
    });
  },

  methods: {
    getGradebooks() {
      this.currentPage++;
      gradebookService
        .getAll(this.currentPage, this.numberShown)
        .then(response => {
          console.log(response);
          this.gradebooks = response.data.data;
          this.totalNumberOfPages = response.data.total;
        })
        .catch(e => {
          alert(e);
        });
    },
    singleGradebook(id) {
      return this.$router.push("/gradebooks/" + id);
    },

    singleProfessor(id) {
      return this.$router.push(`/teachers/${id}`);
    },
    showMore() {
      this.getGradebooks();
    }
  },

  computed: {
    filteredGradebooks() {
      return this.gradebooks.filter(gradebook =>
        gradebook.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },

    ...mapGetters({
      user: "AuthModule/getUser"
    }),

    showMoreExists() {
      if (this.numberShown * this.currentPage >= this.totalNumberOfPages) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  text-align: center;
  color: #000000;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  padding: 0;
  border: none;
  background: none;
}
</style>
