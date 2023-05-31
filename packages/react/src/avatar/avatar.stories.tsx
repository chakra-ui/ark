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
    <AvatarImage
      src="https://gravatar.com/avatar/31552c11962e933b63df3a205ffa1297?s=200&d=wavatar&r=x"
      alt="avatar"
    />
  </Avatar>
)

export const RenderProp = () => (
  <Avatar>
    {(api) => (
      <>
        <AvatarFallback>{api.isLoaded ? 'Loading...' : 'PA'}</AvatarFallback>
        <AvatarImage
          src="https://gravatar.com/avatar/31552c11962e933b63df3a205ffa1297?s=200&d=wavatar&r=x"
          alt="avatar"
        />
      </>
    )}
  </Avatar>
)
