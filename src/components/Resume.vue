<template>
  <div class="resume">
    <resume-header
      class="header"
      :settings="settings.header"
    />
    <resume-segments
      class="segments"
      :segments="resume.segments"
      :settings="settings.segments"
    />
    <resume-information
      :information="settings.information"
      class="information"
    />
    <resume-skills
      class="skills"
      :skills="resume.skills"
      :settings="settings.skills"
    />
    <resume-footer
      class="footer"
      :settings="settings.footer"
    />
  </div>
</template>

<script>
import ResumeHeader from '@/components/ResumeHeader'
import ResumeFooter from '@/components/ResumeFooter'
import ResumeSegments from '@/components/ResumeSegments'
import ResumeSkills from '@/components/ResumeSkills'
import ResumeInformation from '@/components/ResumeInformation'
export default {
  name: 'Resume',
  components: {
    ResumeInformation,
    ResumeHeader,
    ResumeFooter,
    ResumeSegments,
    ResumeSkills
  },
  created () {
    this.setCssVariables(document)
  },
  props: {
    settings: {
      type: Object,
      required: true
      // TODO add validator for mandatory fields
    },
    resume: {
      type: Object,
      required: true
      // TODO add validator for mandatory fields
    }
  },
  methods: {
    setCssVariables (document) {
      const root = document.documentElement
      // TODO test if colors are valid hex colors, if not use defaults
      const colors = this.settings.style.colors
      // TODO maybe write helper
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-accent', colors.accent)
      root.style.setProperty('--color-font', colors.font)
      root.style.setProperty('--color-background', colors.background)
      root.style.setProperty('--color-font-on-primary', colors.fontOnPrimary)
      root.style.setProperty('--color-font-on-accent', colors.fontOnAccent)
      // TODO use defaults if nothing is provided
      const fonts = this.settings.style.fonts
      root.style.setProperty('--font-headline', fonts.headline)
      root.style.setProperty('--font-body', fonts.body)
    }
  }
}
</script>

<style lang="sass" scoped>
.resume
  display: grid
  grid-template-areas: "header header header header" ". segments information ."  ". segments skills ." "footer footer footer footer"
  grid-template-columns: 2rem 1fr 33% 2rem
  grid-template-rows: auto auto 1fr auto
  width: $paper-width
  min-height: $paper-height
  background: var(--color-background)
  border-radius: $border-radius
.header
  grid-area: header
  margin: 0 0 2rem 0
.segments
  grid-area: segments
  margin: 3rem 2rem 0 0
.information
  grid-area: information
  margin: 0 0 2rem 0
.skills
  grid-area: skills
.footer
  margin: 2rem 0 0 0
  grid-area: footer
</style>
