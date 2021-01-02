<template>
  <div id="app">
    <resume class="resume" :segments="segments" :skills="skills" :information="information" :settings="settings" />
  </div>
</template>

<script>
import Resume from 'vue-resume-component'

import segments from '../mock/segments.json'
import skills from '../mock/skills.json'
import information from '../mock/information.json'
import settings from '../mock/settings.json'

export default {
  name: 'App',
  data () {
    return {
      segments,
      skills,
      information,
      settings
    }
  },
  components: {
    Resume
  }
}
</script>

<style>
#app {
  background: #F0F0F0;
  padding: 5rem 0
}
.resume {
  margin: 0 auto;
}
</style>
