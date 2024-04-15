import type { Meta } from '@storybook/react'
import { Avatar } from '../'
import './avatar.css'

const meta: Meta = {
  title: 'Components / Avatar',
}

export default meta

export const Basic = (props: Avatar.RootProps) => (
  <Avatar.Root {...props}>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)

export const Events = () => {
  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
  return (
    <Avatar.Root onStatusChange={handleStatusChange}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
    </Avatar.Root>
  )
}

export const Context = () => (
  <Avatar.Root>
    <Avatar.Context>
      {(api) => <Avatar.Fallback>{api.isLoaded ? 'Loading' : 'PA'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
