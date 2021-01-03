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

<style lang="sass">
.resume-slogan
  margin: 0 0 2rem 0
  color: var(--color-light-fontOnAccent)
  background: var(--color-light-accent)
  border-radius: var(--border-radius)
  padding: 1rem
  font-size: 0.9rem
  @media (prefers-color-scheme: dark)
    color: var(--color-dark-fontOnAccent)
    background: var(--color-dark-accent)
</style>
