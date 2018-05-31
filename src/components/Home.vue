<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="user">
          <p>JD</p>
        </div>
        <h2 style="text-align: center"><router-link :to="{ name: 'subjects' }">Subjects</router-link></h2>
        <hr>
      </div>
      <div class="col-md-4" v-for="sub in allSubjects" :key="sub.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ sub.name }}</h5>
            <p class="card-text">
              <ul>
                <li v-for="cat in sub.categories">{{ cat }}</li>
              </ul>
            </p>
            <button @click="viewDetails(sub.id)" class="btn btn-primary">View Details</button>
            <button @click="viewTasks(sub.id)" class="btn btn-primary">View Tasks</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    viewTasks(id) {
      this.$store.dispatch('selectSubject', id);
      this.$router.push({ name: 'tasks'});
    },
    viewDetails(id) {
      this.$store.dispatch('selectSubject', id);
      this.$router.push({ name: 'subject-details', params: { id: id }})
    }
  },
  computed: {
    allSubjects() {
      return this.$store.getters.getSubjects;
    }
  }
}
</script>

<style lang="css" scoped>
.jumbotron {
  background-color: purple;
  height: 300px;
  position: relative;
}
.initial {
  width: 90%;
  position: absolute;
  background-color: #fff;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 5px;
}
</style>
