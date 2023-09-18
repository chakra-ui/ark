import type { Meta } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './'
import './avatar.css'

type AvatarType = typeof Avatar.Root

const meta: Meta<AvatarType> = {
  title: 'Avatar',
  component: Avatar.Root,
}

export default meta

export const Basic = () => (
  <Avatar.Root>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)

export const Events = () => (
  <Avatar onError={() => console.log('error')} onLoad={() => console.log('loaded')}>
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar>
)
