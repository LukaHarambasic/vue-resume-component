<template>
  <div class="resume-list">
    <ul>
      <li
        class="resume-list-entry"
        v-for="(entry, i) in list"
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
  name: 'ResumeList',
  props: {
    list: {
      type: Array,
      required: true
      // TODO validator
    }
  }
}
</script>

<style lang="sass">
.resume-list
  margin: 0 0 2rem 0
  color: var(--color-font-on-accent)
  background: var(--color-accent)
  border-radius: var(--border-radius)
  padding: 1rem
  .resume-list-entry
    margin: 0 0 .5rem 0
    overflow-wrap: break-word
    word-wrap: break-word
    font-size: .9rem
    &:last-of-type
      margin: 0
    a
      color: var(--color-font-on-accent)
      transition: var(--transition)
      text-decoration: none
      border-bottom: 1px transparent solid
      &:hover
        border-bottom-color: var(--color-font-on-accent)
</style>
