<template>
  <resume
    :settings="settings"
    :resume="resume"
  />
</template>

<script>
import Resume from '@/components/Resume'

// Mock Data - this has to be provided by the user
import MOCK_SETTINGS from '@/mock/settings.private.json'
import MOCK_RESUME from '@/mock/resume.private.json'

export default {
  name: 'App',
  components: {
    Resume
  },
  data () {
    return {
      settings: MOCK_SETTINGS,
      resume: MOCK_RESUME
    }
  }
}
</script>

<style lang="sass">
body
  background: #e2e2e2
#app
  display: grid
  place-items: center
  margin: 1rem
</style>
