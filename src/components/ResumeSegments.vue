<template>
  <div class="resume-segments">
    <div
      v-for="(segment, i) in segments"
      :key="i"
      class="resume-segment"
    >
      <h2
        class="resume-segment-title"
        v-text="segment.title"
      />
      <ul class="resume-segment-list">
        <resume-segment-entry
          v-for="(entry, j) in segment.entries"
          :key="j"
          :title="entry.title"
          :description="entry.description"
          :from="entry.from"
          :to="entry.to"
          :location="entry.location"
          :position="entry.position"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ResumeSegmentEntry from './ResumeSegmentEntry.vue'
export default {
  name: 'ResumeSegments',
  components: { ResumeSegmentEntry },
  props: {
    segments: {
      type: Array,
      required: true
      // TODO: add validation
    },
    settings: {
      type: Object,
      required: true
      // TODO: add validation
    }
  }
}
</script>

<style lang="sass">
.resume-segment
  margin: 0 0 2rem 0
  >.resume-segment-list
    margin: 0 0 0 .2rem
</style>
