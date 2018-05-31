<template lang="html">
  <div class="container">
    <h1>Completed Tasks</h1>
    <div v-if="completeTasks.length > 0">
      <div class="row">
        <div class="col-md-4" v-for="c in completeTasks">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ c.name }}</h5>
              <p class="card-text">Completed on: <i>{{ c.closedDate }}</i><br>
                {{ c.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>There are no completed tasks. Start working on that.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    completeTasks() {
      let tasksList = this.$store.getters.getCompletedTasks;
      if (tasksList != null) {
        return tasksList;
      } else {
        return [];
      }
    }
  }
}
</script>

<style lang="css">
</style>
