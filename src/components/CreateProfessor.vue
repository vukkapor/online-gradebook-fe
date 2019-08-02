<template>
  <div class="container mt-4">
    <form class="form-signin" @submit.prevent="addProfessor">
      <h2 class="form-signin-heading">Create a new professor</h2>

      <input
        v-model="newProfessor.first_name"
        type="text"
        class="form-control"
        name="first_name"
        placeholder="First Name"
        required
        autofocus
      />
      <input
        v-model="newProfessor.last_name"
        type="text"
        class="form-control"
        name="last_name"
        placeholder="Last Name"
        required
      />
      <div v-for="(image, index) in imageList" :key="index">
        Image {{index+1}}:
        <input
          type="text"
          :name="'img'+(index)"
          v-model="newProfessor.img[index]"
        />
        <button class="btn btn-primary" @click="removeImage(index)">Remove Image</button>
      </div>

      <input
        v-model="currentImage"
        type="text"
        class="form-control"
        name="img"
        placeholder="Picture link"
        required
      />

      <button class="btn btn-primary" @click="addImage">Add Image</button>
      <br />Select class:
      <select class="form-control" name="user_id" v-model="newProfessor.gradebook_id">
        <option
          :value="freeGradebook.id"
          v-for="freeGradebook in freeGradebooks"
          :key="freeGradebook.id"
        >{{freeGradebook.name}}</option>
      </select>
      Select user:
      <select
        required
        class="form-control"
        name="user_id"
        id="user_id"
        v-model="newProfessor.user_id"
      >
        <option :value="user.id" v-for="user in users" :key="user.id">{{ user.email }}</option>
      </select>

      <div class="button-group">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-primary" type="button" @click="goToHome">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { professorsService } from "../services/ProfessorService";
import { gradebookService } from "../services/GradebookService.js";
export default {
  data() {
    return {
      currentImage: "",
      img: [],
      newProfessor: {},
      freeGradebooks: [],
      users: []
    };
  },

  created() {
    gradebookService.getAll().then(response => {
      this.freeGradebooks = response.data.filter(
        gradebook => gradebook.professor_id
      );
    });

    professorsService
      .getUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    addProfessor() {
      professorsService
        .addProf(this.newProfessor)
        .then(() => {
          this.goToHome();
        })
        .catch(e => {
          alert(e);
        });
    },

    goToHome() {
      return this.$router.push("/");
    },
    removeImage(index) {
      this.newProfessor.img.splice(index, 1);
    },
    addImage() {
      //console.log(this.newProfessor.img)
      this.img.push(this.currentImage);
      this.newProfessor.img = this.img;
    }
  },
  computed: {
    imageList() {
      return this.img;
    }
  }
};
</script>

<style>
</style>
