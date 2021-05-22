<template>
  <li class="resume-skill-entry">
    <span v-text="title" />
    <!-- TODO: Add level depending on settings-->
  </li>
</template>

<script>
export default {
  name: 'ResumeSkillEntry',
  props: {
    title: {
      type: String,
      required: true
      // TODO: add validation
    },
    level: {
      type: Number,
      default: 0
      // TODO: add validation
    }
  }
}
</script>

<style lang="sass">
.resume-skill-entry
  margin: 0
  display: inline
  font-size: .9rem
  line-height: 1.4
  &:after
    content: ','
    margin: 0 .3rem 0 0
  &:last-child
    &:after
      content: ''
</style>