<template>
  <div class="resume-header">
    <h1
      v-text="name"
      class="resume-header-name"
    />
  </div>
</template>

<script>
export default {
  name: 'ResumeHeader',
  props: {
    name: {
      type: String,
      required: true
      // TODO: add validation
    }
  },
  computed: {
    alt () {
      return `Resume picture of ${this.settings.name}`
    }
  }
}
</script>

<style lang="sass">
.resume-header
  background: var(--color-light-primary)
  border-radius: var(--border-radius)
  padding: 1rem
  @media (prefers-color-scheme: dark)
    background: var(--color-dark-primary)
  >.resume-header-name
    color: var(--color-font-on-primary)
    font-size: 2rem
    font-weight: bold
    @media (prefers-color-scheme: dark)
      color: var(--color-light-font-on-primary)
</style>
