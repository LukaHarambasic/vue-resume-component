<template>
  <div class="resume-footer">
    <ul class="resume-footer-links">
      <li
        class="resume-footer-link"
        v-for="(link, i) in information.links"
        :key="i"
      >
        <a
          :href="link.url"
          v-text="link.title"
        />
      </li>
    </ul>
    <img
      class="resume-footer-logo"
      :src="information.logo"
      v-if="information.logo"
      alt="Decorative logo"
    >
  </div>
</template>

<script>
export default {
  name: 'ResumeFooter',
  props: {
    information: {
      type: Object,
      required: true
      // TODO: add validation
    }
  }
}
</script>

<style lang="sass">
.resume-footer
  position: relative
  color: var(--color-font-on-primary)
  background: var(--color-primary)
  border-radius: 0 0 var(--border-radius) var(--border-radius)
  font-size: 0.9rem
  padding: 1rem
  >.resume-footer-links
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: center
    align-content: center
    align-items: center
    width: auto
    @media screen and (max-width: var(--breakpoint))
      flex-direction: column
    .resume-footer-link
      margin: 0 .5rem 0 0
      @media screen and (max-width: var(--breakpoint))
        margin: 0 0 .5rem 0
      &::after
        content: '•'
        margin: 0 0 0 .5rem
        @media screen and (max-width: var(--breakpoint))
          content: ''
      &:last-of-type
        margin: 0
        &::after
          content: ''
          margin: 0
      a
        color: var(--color-font-on-primary)
        transition: var(--transition)
        text-decoration: none
        border-bottom: 1px transparent solid
        &:hover
          border-bottom-color: var(--color-font-on-primary)
  >.resume-footer-logo
    position: absolute
    right: 1.5rem
    top: -1.5rem
    width: 3rem
    height: 3rem
    box-shadow: var(--box-shadow)
    border-radius: 50%
</style>
