<template lang="html">
  <div class="subject-container">
    <hr>
    <div>
      <h2>{{ sub.name }}</h2>
      <p>
        <button key="1" type="button" class="btn btn-success" @click="selectSub">Select Subject</button>
        <router-link key="2" tag="button" class="btn btn-primary" :to="{ name: 'subject-details', params: {id: sub.id}  }">View Details</router-link>
        <router-link key="3" class="btn btn-primary" v-if="selectedSubject.id == sub.id" tag="button" :to="{ name: 'tasks' }">View Tasks</router-link>
        <button key="4" class="btn btn-danger" type="button" @click="deleteThisSubject">Delete Subject</button>
      </p>
      <transition name="fade">
        <span class="selected far fa-check-circle fa-3x" v-if="selectedSubject.id == sub.id"></span>
      </transition>
    </div>

  </div>
</template>

<script>
export default {
  props: ['sub'],
  computed: {
    selectedSubject() {
      let subject = this.$store.getters.getSubject;
      if (subject) {
        return subject
      }
    }
  },
  methods: {
    selectSub() {
      this.$store.dispatch('selectSubject', this.sub.id);
    },
    deleteThisSubject() {
      let approved = confirm('Are you sure you want to delete this Subject?\nThis will delete all tasks associated with it as well');
      if (approved) {
        this.$store.dispatch('deleteTasks', this.sub.name);
        this.$store.dispatch('deleteSubject', this.sub.id);
      }
    }
  }
}
</script>

<style lang="css">

</style>
