import type { Meta } from 'storybook-solidjs'
import { Avatar } from '../'
import './avatar.css'

const meta: Meta = {
  title: 'Avatar',
}

export default meta

export const Basic = () => (
  <Avatar.Root as="a" href="google.com" onLoadingStatusChange={(e) => console.log(e)}>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)

export const Events = () => (
  <Avatar.Root onLoadingStatusChange={(details) => console.log(details.status)}>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.Root>
)
