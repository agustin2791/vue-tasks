<template lang="html">
  <div class="container">
    <h1>Tasks</h1>
    <button class="btn btn-primary" @click="showNewTaskFrom = !showNewTaskFrom">New Task</button>
    <hr>
    <div v-if="tasks.length > 0">
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group" v-if="tasks"> <!-- <transition-group tag="ul"> -->
            <li class="list-group-item"
                v-for="(task, index) in tasks"
                :class="{active: index == currentTask}"
                @click="activateTask(index, task.id)"
                style="cursor: pointer">{{ task.name }}</li>
          </ul>
        </div>
        <div class="col-md-8">
          <transition name="slide" mode="out-in">
            <app-task-details id="taskDetails"
                              :details="taskDetails"
                              v-if="showDetails && tasks"
                              :deleteThis="deleteCurrentTask"
                              :completeThis="completeCurrentTask"></app-task-details>
          </transition>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No Tasks Available</p>
    </div>
    <transition name="fade">
      <app-new-task v-if="showNewTaskFrom"
                    :leaveFn="leaveModal"></app-new-task>
    </transition>
  </div>
</template>

<script>
import TaskDetails from './TaskDetails.vue';
import NewTask from '../forms/NewTask.vue';
export default {
  data() {
    return {
      currentTask: 0,
      showDetails: true,
      showNewTaskFrom: false
    }
  },
  computed: {
    tasks() {
      let taskList = this.$store.getters.getTasks;
      if (taskList != null) {
        return taskList;
      } else {
        return [];
      }
    },
    taskDetails() {
      console.log('Tasks: ' + this.tasks);
      if (this.tasks.length > 0) {
        return this.$store.getters.getTasks[this.currentTask];
      } else {
        return [];
      }
    }
  },
  watch: {
    taskDetails: function (oldDetails, newDetails) {
      if(oldDetails && newDetails) {
        this.showDetails = false;
        setTimeout(() => {
          this.showDetails = true;
          console.log('!')
        }, 50);
      }
    }
  },
  methods: {
    activateTask(task, id) {
      this.currentTask = task;
      console.log("TASK ID " + id);
    },
    leaveModal() {
      this.showNewTaskFrom = false;
    },
    deleteCurrentTask(id) {
      console.log(id);
      this.$store.dispatch('deleteTask', id);
      this.currentTask = 0;
    },
    completeCurrentTask(id) {
      this.$store.dispatch('completeTask', id);
      this.currentTask = 0;
    }
  },
  components: {
    appTaskDetails: TaskDetails,
    appNewTask: NewTask
  }
}
</script>

<style lang="css">
.list-group-item.active {
  z-index: 0;
}

</style>
