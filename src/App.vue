<template>
  <resume class="resume" :segments="segments" :skills="skills" :information="information" :settings="settings" />
</template>

<script>
import Resume from "@/components/Resume.vue"
// Mock data
import segments from '../mock/segments.json'
import skills from '../mock/skills.json'
import information from '../mock/information.json'
import settings from '../mock/settings.json'
export default {
  components: {Resume},
  data () {
    return {
      segments,
      skills,
      information,
      settings
    }
  },
}
</script>

<style lang="sass">
html, body
  margin: 0
  padding: 0
body
  background: #F0F0F0
  padding: 5rem 1rem
  font-family: Arial, sans-serif
.resume
  margin: 0 auto
</style>
