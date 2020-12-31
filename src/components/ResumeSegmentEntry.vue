<template>
  <li class="resume-segment-entry">
    <div
      v-if="from || to || location"
      class="resume-segment-entry-information"
    >
      <div
        v-if="from || to"
        class="resume-segment-entry-information-date"
      >
        <div
          v-if="from"
          class="resume-segment-entry-information-from"
          v-text="from"
        />
        <div
          v-if="to"
          class="resume-segment-entry-information-to"
          v-text="to"
        />
      </div>
      <div
        v-if="location"
        class="resume-segment-entry-information-location"
        v-text="location"
      />
    </div>
    <h3 class="resume-segment-entry-title">
      <span
        v-if="title"
        v-text="title"
      />
      <span
        v-if="position"
        v-text="positionInBrackets"
      />
    </h3>
    <p
      v-if="description"
      class="resume-segment-entry-description"
      v-html="description"
    />
  </li>
</template>

<script>
export default {
  name: 'ResumeSegmentEntry',
  props: {
    title: {
      required: true,
      type: String
    },
    description: {
      default: '',
      type: String
    },
    position: {
      default: '',
      type: String
    },
    location: {
      default: '',
      type: String
    },
    from: {
      default: '',
      type: String
    },
    to: {
      default: '',
      type: String
    }
  },
  computed: {
    positionInBrackets () {
      return ` (${this.position})`
    }
  }
}
</script>

<style lang="sass" scoped>
.resume-segment-entry
  position: relative
  display: flex
  flex-flow: column wrap
  justify-content: flex-start
  align-items: flex-start
  margin: 0 0 0 1rem
  padding: 0 0 1rem 0
  width: 100%
  &:before
    content: ''
    position: absolute
    left: -.8rem
    background: var(--color-accent)
    width: 3px
    height: 100%
  &:after
    content: ''
    position: absolute
    left: -17px
    top: 18px
    width: .75rem
    height: .75rem
    background: var(--color-accent)
    border: 2px solid var(--color-background)
    border-radius: 50%
  &:first-of-type
    &:before
      border-radius: $border-radius $border-radius 0 0
  &:last-of-type
    padding: 0
    &:before
      border-radius: 0 0 $border-radius $border-radius
.resume-segment-entry-information
  display: flex
  flex-flow: row nowrap
  font-size: .8rem
  font-style: italic
  margin: 0 0 .2rem 0
  .resume-segment-entry-information-date
    display: flex
    flex-flow: row nowrap
    .resume-segment-entry-information-from
      margin: 0 .15rem 0 0
      &::after
        content: '-'
        margin: 0 0 0 .15rem
    .resume-segment-entry-information-to
      margin: 0 .25rem 0 0
      &::after
        content: '•'
        margin: 0 0 0 .25rem
.resume-segment-entry-title
  margin: 0 0 .2rem 0
.resume-segment-entry-description
  width: 100%
  font-size: .9rem
</style>
