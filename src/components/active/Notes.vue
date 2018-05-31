<template lang="html">
  <div>
      <div class="card" style="margin-bottom: 5px;">
        <div class="card-body">
          <p>{{ note.note }}</p>
          <p style="font-size: small"><i>{{ note.creator }} - {{ note.date }}</i></p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['note', 'noteIndex']
}
</script>

<style lang="css">
</style>
