import type { Meta } from '@storybook/react'
import { Avatar } from './'

type AvatarType = typeof Avatar

const meta: Meta<AvatarType> = {
  title: 'Avatar',
  component: Avatar,
}

export default meta

export const Basic = () => {
  return <div>Avatar</div>
}
