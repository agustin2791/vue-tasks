<template lang="html">
  <div>
    <div class="modal" @click="leaveFormFn()">
    </div>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Subject</h5>
            <button type="button" class="close" aria-label="Close" @click="leaveFormFn()"><span aria-hidden="true">&times;</span></button>
          </div>
          <form>
            <div class="modal-body">
                <div class="form-group">
                  <label>Subject Name</label>
                  <input type="text" v-model="subjectName" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click.prevent="newSub">Add Subject</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    leaveFormFn: {
      type: Function
    }
  },
  data() {
    return {
      subjectName: ''
    }
  },
  methods: {
    newSub() {
      this.$store.dispatch('addSubject', this.subjectName);
      this.leaveFormFn();
    }
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
