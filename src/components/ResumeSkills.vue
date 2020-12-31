<template>
  <div class="resume-skills">
    <h2>Skills</h2>
    <div
      v-for="(skill, i) in skills"
      :key="i"
      class="resume-skills-category"
    >
      <h3
        class="resume-skills-category-title"
        v-text="skill.title"
      />
      <ul class="resume-skills-category-entries">
        <resume-skill-entry
          v-for="(entry, j) in skill.entries"
          :key="j"
          :title="entry.title"
          :level="entry.level"
          class="resume-skills-category-entry"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ResumeSkillEntry from '@/components/ResumeSkillEntry'
export default {
  name: 'ResumeSkills',
  components: {
    ResumeSkillEntry
  },
  props: {
    skills: {
      type: Object,
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

<style lang="sass" scoped>
.resume-skills
  background: var(--color-accent)
  border-radius: $border-radius
  padding: 1rem
.resume-skills-category
  margin: 0 0 1rem 0
.resume-skills-category-entries
  list-style: none
  display: flex
  flex-direction: row
  flex-wrap: wrap
</style>
