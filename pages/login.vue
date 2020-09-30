<template>
  <v-container>
    <p @click="loginWithAuthZero">Click to Login</p>
    <v-progress-circular :size="50" color="primary" indeterminate />
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    this.loginWithAuthZero()
  },
  methods: {
    loginWithAuthZero() {
      this.$auth0.login()
    }
  }
}
</script>
