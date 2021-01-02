<template>
  <div class="resume-slogan">
    <p v-html="slogan" />
  </div>
</template>

<script>
export default {
  name: 'ResumeSlogan',
  props: {
    slogan: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.resume-slogan
  margin: 0 0 2rem 0
  background: var(--color-accent)
  border-radius: var(--border-radius)
  padding: 1rem
  font-size: 0.9rem
</style>
