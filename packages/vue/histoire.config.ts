import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['**/*.stories.vue'],
  setupFile: '.storybook/main.ts',
  viteNodeInlineDeps: [/lucide-vue-next/],
  vite: {
    server: {
      port: 6006, // set the port to be fixed on 6006
    },
  }
})
