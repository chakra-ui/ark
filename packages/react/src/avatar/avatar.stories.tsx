import type { Meta } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './'
import './avatar.css'

type AvatarType = typeof Avatar

const meta: Meta<AvatarType> = {
  title: 'Avatar',
  component: Avatar,
}

export default meta

export const Basic = () => (
  <Avatar>
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar>
)

export const Events = () => (
  <Avatar onError={() => console.log('error')} onLoad={() => console.log('loaded')}>
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar>
)
