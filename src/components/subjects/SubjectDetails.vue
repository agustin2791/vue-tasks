<template lang="html">
  <div class="container">
    <h1>{{ details.name }}</h1>
    <form>
      <div class="form-group">
        <label>Add new Category for this subject</label>
        <input type="text" v-model="newCat" class="form-control">
      </div>
      <button class="btn btn-primary" name="button" @click.prevent="newCatName">Add Category</button>
    </form>
    <br>
    <transition name="slide" mode="out-in">
      <div class="alert alert-danger" v-if="error">
        <p>This Category name already exists.</p>
      </div>
    </transition>
    <hr>
    <div v-if="details.categories != null" class="">
      <transition-group name="slide" mode="out-in">
        <div v-for="(cat, index) in details.categories"
             :key="cat"
             class="card">
          <div class="card-body">
            <h5 class="card-title">{{ cat }}</h5>
            <span class="fa fa-times delete-x" @click="deleteCategory(index)"></span>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-else>
      <p>There are categories for this subject.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      newCat: ''
    }
  },
  computed: {
    details() {
      const subjectId = this.id;
      let subjects = this.$store.getters.getSubjects;
      return subjects.find(element => element.id == subjectId)
    },
    error() {
      let details = this.details;
      if (details.categories) {
        if (details.categories.indexOf(this.newCat) > -1) {
          return true;
        } else {
          return false;
        }
      }

    }
  },
  methods: {
    newCatName() {
      let subjectId = this.id,
          name = this.newCat;
      if(this.error) {
        return false;
      }
      this.$store.dispatch('addCategory', {subjectId, name});
      this.newCat = '';
    },
    deleteCategory(index) {
      let subjectId = this.id;
      console.log(index);
      this.$store.dispatch('removeCategory', {subjectId, index});
    }
  }
}
</script>

<style>
.delete-x {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: #f00;
  color: #fff;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 150%;
  border-radius: 50%;
}
</style>
