import type { Meta } from '@storybook/react'
import { Pressable } from './pressable'

export default {
  title: 'React/Pressable',
} as Meta

export const basic = () => {
  return <Pressable onPress={() => console.log('onPress')}>Pressable</Pressable>
}
