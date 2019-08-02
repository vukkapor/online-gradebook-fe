<template>
  <div class="container mt-4">
    <form class="form-signin" @submit.prevent="registerMethod">
      <h2 class="form-signin-heading">Registration</h2>
      <input
        v-model="newUser.firstName"
        type="text"
        class="form-control"
        name="firstName"
        placeholder="First Name"
        required
        autofocus
      />
      <input
        v-model="newUser.lastName"
        type="text"
        class="form-control"
        name="lastName"
        placeholder="Last Name"
        required
      />
      <input
        v-model="newUser.email"
        type="text"
        class="form-control"
        name="email"
        placeholder="Email"
        required
      />
      <input
        v-model="newUser.password"
        type="password"
        class="form-control"
        name="password"
        placeholder="Password"
        required
      />
      <input
        v-model="newUser.confirmPassword"
        type="password"
        class="form-control"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <input type="checkbox" name="terms" value="terms" required /> Accept terms and conditions
      <br />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { authService } from "../services/AuthService";
export default {
  data() {
    return {
      newUser: {}
    };
  },

  methods: {
    checkStringForNumbers(input) {
      let str = String(input);
      for (let i = 0; i < str.length; i++) {
        console.log(str.charAt(i));
        if (!isNaN(str.charAt(i))) {
          //if the string is a number, do the following
          return false;
        }
      }
    },
    registerMethod() {
      if (this.newUser.password != this.newUser.confirmPassword) {
        alert("Nisu isti  passwordi");
        return;
      }
      if (this.newUser.password.length < 8) {
        alert("Password mora da ima bar 8 karaktera");
        return;
      }

      if (!this.checkStringForNumbers(this.newUser.password)) {
        alert("Password mora da ima bar jedan broj");
        return;
      }
      authService
        .register(this.newUser)
        .then(() => {
          this.$router.push("/");
        })
        .catch(e => {
          alert(e);
        });
    }
  }
};
</script>