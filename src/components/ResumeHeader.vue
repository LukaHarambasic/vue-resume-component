<template>
  <div class="resume-header">
    <img
      class="resume-header-image"
      :src="settings.image"
      :alt="alt"
    >
    <h1
      v-text="settings.name"
      class="resume-header-name"
    />
  </div>
</template>

<script>
export default {
  name: 'ResumeHeader',
  props: {
    settings: {
      type: Object,
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

<style lang="sass" scoped>
.resume-header
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: flex-start
  align-items: flex-start
  background: var(--color-primary)
  border-radius: $border-radius $border-radius 0 0
  padding: 1rem 2rem
  height: 6rem
.resume-header-image
  width: 8rem
  border-radius: $border-radius
  box-shadow: $box-shadow
.resume-header-name
  color: var(--color-font-on-primary)
  font-size: 2rem
  font-weight: bold
  margin: 1rem 0 0 1rem
</style>
