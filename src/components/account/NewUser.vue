<template lang="html">
  <div class="new-user container">
    <form class="new-user-form">
      <label>Email:</label>
      <input type="email" class="form-control" v-model="email">
      <label>Username:</label>
      <input type="text" class="form-control" v-model="username">
      <label>Password:</label>
      <input type="password" class="form-control" v-model="password">
      <label>Confirm Password:</label>
      <input type="password" class="form-control" v-model="passwordConf">
    </form>
    {{ email }}<br>
    {{ username }}<br>
    {{ password }}<br>
    {{ passwordConf }}<br>
    {{ api }}
  </div>
</template>

<script>
import UserService from '../../services/UserService'
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      api: []
    }
  },
  mounted() {
    this.getApi();
  },
  methods: {
    async getApi() {
      const response = await UserService.fetchUser()
      this.api = response.data;
    }
  }
}
</script>

<style lang="css">
</style>
