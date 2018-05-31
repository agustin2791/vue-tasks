<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" :to="{ name: 'home' }" class="nav-item" active-class="active" exact>
            <a class="nav-link">Home</a>
          </router-link>
          <router-link tag="li" :to="{name: 'subjects'}" class="nav-item" active-class="active">
            <a class="nav-link">Subjects</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'tasks' }" class="nav-item" active-class="active" exact>
            <a class="nav-link">Active Tasks</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'completed' }" active-class="active" class="nav-item">
            <a class="nav-link" href="#">Completed Tasks</a>
          </router-link>

        </ul>
        <span class="navbar-text">{{ selectedSubject.name }}</span>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  computed: {
    selectedSubject() {
      return this.$store.getters.getSubject;
    }
  },
  created() {
    let subjects = this.$store.getters.getSubjects.length > 0;
    console.log('subjects: ' + subjects);
    if (subjects) {
      const sub = 1;
      this.$store.dispatch('selectSubject', sub);
    }
  }
}
</script>

<style lang="css">

</style>
