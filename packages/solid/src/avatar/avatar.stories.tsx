import type { Meta } from 'storybook-solidjs'
import { Avatar, AvatarFallback, AvatarImage } from './'
import './avatar.css'

const meta: Meta = {
  title: 'Avatar',
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
