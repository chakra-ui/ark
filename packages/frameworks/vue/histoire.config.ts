import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  tree: {
    groups: [
      {
        title: 'Components',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        include: (file) => true,
      },
    ],
  },
})
