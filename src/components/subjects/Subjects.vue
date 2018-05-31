<template lang="html">
  <div class="container">
    <h1>Subjects</h1>
    <button type="button" class="btn btn-primary" name="button" @click="newSubForm = !newSubForm">Add New Subject</button>

    <div class="row">
      <transition-group name="slide" mode="out-in" class="col-md-12">
      <app-subject
                  v-for="sub in subjects"
                  :sub="sub"
                  :key="sub.id"></app-subject>
      </transition-group>
    </div>
    <transition name="fade">
      <app-new-subject
                      v-if="newSubForm"
                      :leaveFormFn="leaveFormFn"></app-new-subject>
    </transition>
  </div>
</template>

<script>
import Subject from './Subject.vue';
import NewSubject from '../forms/NewSubject.vue';
export default {
  data() {
    return {
      newSubForm: false
    }
  },
  computed: {
    subjects() {
      return this.$store.getters.getSubjects;
    }
  },
  methods: {
    leaveFormFn() {
      this.newSubForm = false;
    }
  },
  components: {
    appSubject: Subject,
    appNewSubject: NewSubject
  }
}
</script>

<style lang="css">
</style>
