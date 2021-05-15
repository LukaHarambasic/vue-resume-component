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

<style lang="sass">
.resume-image
  margin: 0 0 2rem 0
  >img
    max-width: 100%
    border-radius: var(--border-radius)
    box-shadow: var(--box-shadow)
</style>