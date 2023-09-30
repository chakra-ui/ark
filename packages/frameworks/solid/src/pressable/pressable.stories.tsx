import type { Meta } from 'storybook-solidjs'
import { Pressable } from './'

const meta: Meta = {
  title: 'Pressable',
}

export default meta

export const Basic = () => {
  return <Pressable.Root onPress={() => console.log('onPress')}>Pressable</Pressable.Root>
}
