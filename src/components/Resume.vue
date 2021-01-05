<template>
  <div class="resume">
    <resume-header
      class="header"
      :name="information.name"
    />
    <resume-segments
      class="segments"
      :segments="segments"
      :settings="settings.segments"
    />
    <aside class="sidebar">
      <resume-image
        class="image"
        :image="information.image"
        v-if="information.image"
      />
      <resume-slogan
        class="slogan"
        :slogan="information.slogan"
        v-if="information.slogan"
      />
      <resume-list
        :list="information.list"
        class="list"
        v-if="information.list"
      />
      <resume-skills
        class="skills"
        :skills="skills"
        :settings="settings.skills"
        v-if="skills"
      />
    </aside>
    <resume-footer
      class="footer"
      :information="information.footer"
    />
  </div>
</template>

<script>
// import MOCK_SETTINGS from '../../demo/mock/settings.json'
// import MOCK_SEGMENTS from '../../demo/mock/segments.json'
// import MOCK_SKILLS from '../../demo/mock/skills.json'
// import MOCK_INFORMATION from '../../demo/mock/information.json'

import ResumeHeader from './ResumeHeader.vue'
import ResumeFooter from './ResumeFooter.vue'
import ResumeSegments from './ResumeSegments.vue'
import ResumeSkills from './ResumeSkills.vue'
import ResumeList from './ResumeList.vue'
import ResumeImage from './ResumeImage.vue'
import ResumeSlogan from './ResumeSlogan.vue'
export default {
  name: 'Resume',
  components: {
    ResumeSlogan,
    ResumeImage,
    ResumeList,
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
      required: true,
      // default: MOCK_SETTINGS
      // TODO add validator for mandatory fields
    },
    information: {
      type: Object,
      required: true,
      // default: MOCK_INFORMATION
      // TODO add validator for mandatory fields
    },
    segments: {
      type: Array,
      required: true,
      // default: MOCK_SEGMENTS
      // TODO add validator for mandatory fields
    },
    skills: {
      type: Array,
      required: true,
      // default: MOCK_SKILLS
      // TODO add validator for mandatory fields
    },
  },
  methods: {
    setCssVariables (doc) {
      // TODO test if colors are valid hex colors, if not use defaults
      // TODO use defaults if nothing is provided
      const colors = this.settings.style.colors
      const colorsLight = Object.entries(colors.light).map(([key, value]) => `--color-${key}: ${value};`).join(' ')
      const colorsDark = Object.entries(colors.dark).map(([key, value]) => `--color-${key}: ${value};`).join(' ')
      const fonts = Object.entries(this.settings.style.fonts).map(([key, value]) => `--font-${key}: ${value};`).join(' ')
      const styleNode = document.createTextNode(`
      :root {
        ${colorsLight}
        ${fonts}
      }
      @media (prefers-color-scheme: dark) {
        :root {
          ${colorsDark}
        }
      }
      `)
      const styleElement = doc.createElement('style')
      styleElement.appendChild(styleNode)
      const ref = doc.querySelector('style')
      ref.parentNode.insertBefore(styleElement, ref)
    }
  }
}
</script>

<style lang="sass">
\:root
  @media (prefers-color-scheme: dark)
    background: lightseagreen
  --border-radius: 2px
  --transition: all 150ms ease-in-out
  --box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1)
.resume
  display: grid
  grid-template-areas: "sidebar header" "sidebar segments" "footer footer"
  grid-template-columns: 30% 1fr
  grid-template-rows: auto 1fr auto
  grid-gap: 2rem
  width: 210mm
  min-height: 297mm
  background: var(--color-background)
  color: var(--color-font)
  border-radius: var(--border-radius)
  font-size: 1rem
  @media screen and (max-width: 240mm)
    grid-template-areas: "header" "sidebar" "segments" "footer"
    grid-template-columns: 1fr
    grid-template-rows: auto auto auto auto
    width: 100%
    min-height: auto
  *
    font-family: var(--font-body)
    box-sizing: border-box
    &:after, &:before
      box-sizing: border-box
  // RESET
  h1, h2, h3, h4, h5, h6
    line-height: 1
  h1, h2, h3, h4, h5, h6, p, ul, ol
    margin: 0
    padding: 0
  ul, ol
    list-style: none
  // TYPO
  h1, h2, h3
    font-family: var(--font-headline)
  h2
    font-size: 1.2rem
    font-weight: bold
    margin: 0 0 .75rem 0
  h3
    font-size: 1rem
    font-weight: bold
  p
    line-height: 1.5
    overflow-wrap: break-word
    word-wrap: break-word
    word-break: break-word
    hyphens: auto
  // ALIGNMENT
  >.header
    grid-area: header
    margin: 2rem 2rem 0 0
    @media screen and (max-width: 240mm)
      margin: 2rem 2rem 0 2rem
  >.segments
    grid-area: segments
    margin: 0 2rem 0 0
    @media screen and (max-width: 240mm)
      margin: 0 2rem 0 2rem
  >.sidebar
    grid-area: sidebar
    margin: 2rem 0 0 2rem
    @media screen and (max-width: 240mm)
      margin: 0 2rem 0 2rem
  >.footer
    grid-area: footer
</style>
