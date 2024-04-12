import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  tree: {
    groups: [
      {
        title: 'Components',
        include: (file) => true,
      },
    ],
  },
})
