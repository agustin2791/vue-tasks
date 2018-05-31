<template>
  <div id="app">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: {
    appHeader: Header
  },
  beforeCreate() {
    this.$store.dispatch('loadTasks');
    this.$store.dispatch('loadSubjects');
    this.$store.dispatch('loadCompleted');
  }
}
</script>

<style lang="scss">

</style>
