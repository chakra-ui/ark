import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['**/*.stories.vue'],
  setupFile: '.storybook/main.ts',
})
