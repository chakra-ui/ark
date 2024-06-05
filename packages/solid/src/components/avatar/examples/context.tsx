import { Avatar } from '../..'

export const Context = () => (
  <Avatar.Root>
    <Avatar.Context>
      {(avatar) => <Avatar.Fallback>{avatar().loaded ? 'PA' : 'Loading'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
