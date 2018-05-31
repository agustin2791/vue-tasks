<template lang="html">
  <div>
    <div class="modal" @click="leaveFormFn()"></div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Note {{ taskId }}</h5>
          <button type="button" class="close" aria-label="Close" @click="leaveFormFn()"><span aria-hidden="true">&times;</span></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
              <textarea name="name" rows="12" cols="80" v-model="note" class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input type="text" v-model="today" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="date">Creator</label>
              <input type="text" v-model="creator" class="form-control" disabled>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="submit">Add Note</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leaveFormFn: Function,
    taskId: Number
  },
  data() {
    return {
      note: '',
      creator: 'Jesus Diaz-Barriga'
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('addNote', {
        id: this.taskId,
        note: this.note,
        creator: this.creator,
        date: this.today
      });
      this.note = '';
      this.leaveFormFn();
    }
  },
  computed: {
    today() {
      let date = new Date();
      return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    }
  }
}
</script>

<style lang="css" scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, .50);
  z-index: 3;
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
