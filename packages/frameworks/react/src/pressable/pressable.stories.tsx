import type { Meta } from '@storybook/react'
import { Pressable } from './pressable'

type PressableType = typeof Pressable

const meta: Meta<PressableType> = {
  title: 'Pressable',
  component: Pressable,
}

export default meta

export const Basic = () => {
  return <Pressable onPress={() => console.log('onPress')}>Pressable</Pressable>
}
