<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav" style="margin-left: auto;  margin-right: auto;">
        <li class="nav-item">
          <router-link class="navbar-link" to="/">Online Gradebook</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="!user" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="!user" to="/register">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="user" to="/teachers">Teachers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="user" to="/teachers/1">Single teacher</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="user" to="/gradebook/create">Create Gradebook</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="user" to="/professors/create">Create Professor</router-link>
        </li>
        <li class="nav-item">
          <router-link class="navbar-link" v-if="user" to="/my-gradebook">My Gradebook</router-link>
        </li>
        <li class="nav-item">
          <button v-if="user" @click="logout" class="btn btn-outline-success" type="submit">Logout</button>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import { authService } from "./services/AuthService";

export default {
  name: "app",

  methods: {
    ...mapMutations({
      setUser: "AuthModule/setUser"
    }),

    logout() {
      authService.logout();
      this.setUser(null);
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },

  computed: {
    ...mapGetters({
      user: "AuthModule/getUser"
    })
  }
};
</script>