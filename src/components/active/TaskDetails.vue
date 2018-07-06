<template lang="html">
  <div class="">

    <h2>{{ details.name}}<br><small v-if="details.due">{{ details.due }}</small></h2>
    <p v-if="details.category">Category: <i>{{ details.category }}</i></p>
    <br>
    <form v-if="descriptionEdit.edit">
      <textarea class="form-control" v-model="descriptionEdit.text" rows="10"></textarea>
      <button type="button" name="button" class="btn btn-primary" @click="changeDescription">Save</button>
      <button type="button" name="button" class="btn btn-default" @click="toggleEditDescription">Cancel</button>
    </form>
    <div v-else class="description-container" :class="{active: hovering}" @mouseenter="isHovering" @mouseleave="isNotHovering">
      <p style="white-space: pre-line;">{{ descriptionEdit.text }}</p>
      <button type="button" class="btn btn-primary small-btn" v-if="hovering" name="button" @click="toggleEditDescription">Edit</button>
    </div>
    <button type="button" class="btn btn-outline-primary" @click="newNoteForm = !newNoteForm" name="button">Add Note</button>

    <br><br>
    <h4>Notes</h4>
    <app-notes
                v-if="details.notes.length > 0"
                v-for="(note, index) in details.notes"
                :note="note"
                :noteIndex="index"
                :key="index"></app-notes>
    <br><br>
    <button type="button" class="btn btn-primary" @click="completeTask" name="button">Complete Task</button>
    <button type="button" class="btn btn-danger" @click="deleteTask" name="button">Delete</button>
    <transition name="fade">
      <app-new-note
                    :leaveFormFn="leaveFormFn"
                    :taskId="details.id"
                    v-if="newNoteForm"
                    class="modal-container"></app-new-note>
    </transition>
  </div>
</template>

<script>
import NewNote from '../forms/NewNote.vue';
import Notes from './Notes.vue';
import swal from 'sweetalert';
export default {
  props: ['details', 'deleteThis', 'completeThis'],
  data() {
    return {
      hovering: false,
      hoveringNote: false,
      descriptionEdit: {edit: false, text: this.details.description, id: this.details.id},
      newNoteForm: false
    }
  },
  methods: {
    isHovering() {
      this.hovering = true;
    },
    isNotHovering() {
      this.hovering = false;
    },
    toggleEditDescription() {
      this.descriptionEdit.edit = !this.descriptionEdit.edit;
      this.hovering = false;
    },
    leaveFormFn() {
      this.newNoteForm = false;
    },
    changeDescription() {
      let note = this.descriptionEdit.text;
      let id = this.descriptionEdit.id;
      console.log(note + ' ' + id);
      this.$store.dispatch('updateDescription', {id, note});
      this.toggleEditDescription();
    },
    completeTask() {
      swal({
        title: 'Are you sure?',
        text: 'Complete this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then((willComplete) => {
        if(willComplete) {
            this.completeThis(this.details.id);
            swal('Task has been marked as completed', {
              icon: 'success'
            })
          } else {
            swal('Nothing happend! Get back to work.')
        }
      });
    },
    deleteTask() {
      swal({
        title: 'Are you sure?',
        text: 'You will delete this Task forever!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
        if(willDelete) {
            this.deleteThis(this.details.id);
            swal('Task has been deleted', {
              icon: 'success'
            })
          } else {
            swal('Nothing happend!')
        }
      });
      // let result = confirm('Are you sure you want to Delete this task?');

    }
  },
  components: {
    appNewNote: NewNote,
    appNotes: Notes
  }
}
</script>

<style lang="css" scoped>
.description-container {
  position: relative;
  margin-bottom: 5px;
  border: thin #fff solid;
  padding: 5px;
  border-radius: 0;
  transition: ease .25s;
}
.description-container.active {
  border: solid thin #007bff;
}
.description-container .small-btn {
  font-size: small;
  height: 25px;
  padding: 5px 30px;
  line-height: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0;
}
</style>
