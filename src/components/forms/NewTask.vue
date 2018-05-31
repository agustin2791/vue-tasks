<template>
  <div>
    <div class="modal" @click="leaveFn()">
    </div>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Task</h5>
            <button type="button" class="close" aria-label="Close" @click="leaveFn()"><span aria-hidden="true">&times;</span></button>
          </div>
          <form>
            <div class="modal-body">
                <div class="form-group">
                  <label>Task Name</label>
                  <input type="text" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                  <label>Due Date</label>
                  <app-datepicker v-model="due" :format="dateFormat" bootstrap-styling="true"></app-datepicker>
                </div>
                <div class="form-group">
                  <label>Task Description</label>
                  <textarea v-model="description" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>Subject</label>
                  <input type="text" class="form-control" disabled name="" :value="selected.name">
                  <h6><small>*To change task Subject, change the current Subject in the Subjects page.</small></h6>
                </div>
                <div class="form-group">
                  <label>Subject</label>
                  <select class="form-control" v-model="category">
                    <option value="0">------</option>
                    <option v-for="(cat, index) in selected.categories" :value="index">{{ cat }}</option>
                  </select>
                </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click.prevent="createNewTask">Create Task</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  props: {
    leaveFn: Function
  },
  data() {
    return {
      name: '',
      due: new Date(),
      description: '',
      category: 0
    }
  },
  methods: {
    createNewTask() {
      let newTask = {
        name: this.name,
        due: this.dateFormat(this.due),
        description: this.description,
        subject: this.selected.name,
        category: this.selected.categories[this.category]
      }
      this.$store.dispatch('addTask', newTask);
      this.leaveFn();
      this.name = '';
      this.due = '';
      this.description = '';
      this.category = 0;
    },
    dateFormat(date) {
      return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    }
  },
  computed: {
    selected() {
      return this.$store.getters.getSubject;
    }
  },
  components: {
    appDatepicker: Datepicker
  }
}
</script>

<style lang="css" scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, .50);
  z-index: 1;
}
.modal-dialog {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 5;
}
</style>
