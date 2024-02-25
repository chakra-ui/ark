import type { StoryFn } from '@storybook/svelte'
import { AvatarRoot } from '..'

const meta = {
  title: 'Avatar',
  component: AvatarRoot,
}

export default meta

export const Basic = (args): StoryFn => ({
  components: { AvatarRoot },
  setup() {
    return { args }
  },
  template: '<AvatarRoot>Test avatar</AvatarRoot>',
})
