import type { Meta } from 'storybook-solidjs'
import { Pressable } from './pressable'

const meta: Meta = {
  title: 'Pressable',
}

export default meta

export const Basic = () => {
  return <Pressable onPress={() => console.log('onPress')}>Pressable</Pressable>
}
