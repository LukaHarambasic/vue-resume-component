<template>
  <div class="resume-image">
    <img
      :src="image"
      alt="Resume picture"
    >
  </div>
</template>

<script>
export default {
  name: 'ResumeImage',
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.resume-image
  margin: 0 0 2rem 0
  img
    max-width: 100%
    border-radius: $border-radius
    box-shadow: $box-shadow
</style>
