> This package is WIP - it's functionally working, but customisations aren't implemented.

# vue-resume-component

[![demo](https://img.shields.io/badge/demo-live-informational)](https://vue-resume-component.vercel.app/) [![npm](https://img.shields.io/npm/v/vue-resume-component)](https://www.npmjs.com/package/vue-resume-component) [![npm bundle size](https://img.shields.io/bundlephobia/min/vue-resume-component)](https://www.npmjs.com/package/vue-resume-component) [![GitHub](https://img.shields.io/github/license/LukaHarambasic/vue-resume-component)](https://github.com/LukaHarambasic/vue-resume-component/blob/main/LICENSE)

A resume / CV component for Vue.js and Nuxt.js.

> I wouldn't recommend to use this package if you want a bullet proof CV as it uses some new [technologies](#technologies).

## Usage

### Installation

```shell
$ npm install vue-resume-component
$ yarn add vue-resume-component
```

### Data

You can find the latest data structure in [demo/mock](https://github.com/LukaHarambasic/vue-resume-component/tree/main/demo/mock) (a detailed documentation will be added later). It's recommended to use four different files ((learn more about this)[#structure]):

- [segments](https://github.com/LukaHarambasic/vue-resume-component/blob/main/demo/mock/segments.json)
- [skills](https://github.com/LukaHarambasic/vue-resume-component/blob/main/demo/mock/skills.json)
- [information](https://github.com/LukaHarambasic/vue-resume-component/blob/main/demo/mock/information.json)
- [settings](https://github.com/LukaHarambasic/vue-resume-component/blob/main/demo/mock/settings.json)

JSONs are just working out of the box, you could also include them in `data` in the same component where you add `vue-resume-component`. You also could think about consume data from Firebase or something completely different.

### Example

#### Vue.js example

```vue
<template>
    <resume
      :segments="segments"
      :skills="skills"
      :information="information"
      :settings="settings"
    />
</template>

<script>
import resume from 'vue-resume-component'
// Data
import segments from '@/content/cv/segments.json'
import skills from '@/content/cv/skills.json'
import information from '@/content/cv/information.json'
import settings from '@/content/cv/settings.json'
export default {
  components: {
    resume,
  },
  data() {
    return {
      segments,
      skills,
      information,
      settings,
    }
  },
}
</script>
```

#### Nuxt.js Example

The only difference is that the component is wrapped in `<client-only>`.

```vue
<template>
  <client-only>
    <resume
      :segments="segments"
      :skills="skills"
      :information="information"
      :settings="settings"
    />
  </client-only>
</template>

<script>
import resume from 'vue-resume-component'
// Data
import segments from '@/content/cv/segments.json'
import skills from '@/content/cv/skills.json'
import information from '@/content/cv/information.json'
import settings from '@/content/cv/settings.json'
export default {
  components: {
    resume,
  },
  data() {
    return {
      segments,
      skills,
      information,
      settings,
    }
  },
}
</script>
```

## Idea

This is a component which can be implemented in existing websites or as standalone solution, e.g. with Nuxt.

### Structure

1. Segments - All the basic stuff for a CV: Education, Work, Voluntary, Side Projects, …
2. Skills - Lists of stuff you are capable of: Programming, Language, Soft Skills, …
3. Information - Content which isn't part of segments and skills: Name, Image, Logo, Links, …
4. Settings - You can style, define orders (as it is, alphabetically, per date) or what you want to display.

### Technologies

This component is using:

- Vue3 (isn't a beta, but isn't as stable as Vue2 (personal gut feeling))
- [CSS Variables (Custom Properties)](https://caniuse.com/css-variables)
- [CSS Grid](https://caniuse.com/css-grid)

## Roadmap

- [ ] Enable all customizations from settings
- [ ] Allow print to PDF
- [ ] Add docu with vuepress
- [ ] Provide example configs (currently visible in [demo/mock](https://github.com/LukaHarambasic/vue-resume-component/tree/main/demo/mock))
- [ ] Add different demos
- [ ] Provide ready to clone [nuxt/content](https://content.nuxtjs.org/) repo with Deploy to Vercel & Netlify button
- [ ] Add tests
- [ ] Add configurable dark mode

## Development

### Basic setup

1. Install [Vue CLI 3](https://github.com/vuejs/vue-cli/) ([more details](https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Will-this-replace-my-current-development-process)).
2. Run `vue serve --open src/components/Resume.vue` - won't work until you provide mock data as defaults for the props.

### Test environment

1. This repo contains a complete Vue setup to test the package locally. This uses [yalc](https://github.com/wclr/yalc) to install the package locally.
2. Start localhost with `npm run serve` in `dev`.
3. Execute `npm run publish:local` in the root directory, which will cause a build and `yalc publish`.
4. After this you can hard reload your localhost to see the changes, hot reload isn't working every time.
5. If you want to deploy your changes locally, start over at `3.`.
