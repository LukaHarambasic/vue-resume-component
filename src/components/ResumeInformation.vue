<template>
  <div class="resume-information">
    <ul>
      <li
        class="resume-information-entry"
        v-for="(entry, i) in information"
        :key="i"
      >
        <a
          v-if="entry.url"
          :href="entry.url"
          v-text="entry.title"
        />
        <span
          v-else
          v-text="entry.title"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ResumeInformation',
  props: {
    information: {
      type: Array,
      required: true
      // TODO validator
    }
  }
}
</script>

<style lang="sass" scoped>
.resume-information
  background: var(--color-accent)
  border-radius: $border-radius
  padding: 1rem
.resume-information-entry
  line-height: 1.5
  list-style: decimal-leading-zero
  margin: 0 0 0 1.5rem
  overflow-wrap: break-word
  word-wrap: break-word
  font-size: .9rem
  &::marker
    font-weight: bold
  a
    color: var(--color-font)
    transition: $transition
    text-decoration: none
    border-bottom: 1px transparent solid
    &:hover
      border-bottom-color: var(--color-font)
</style>
