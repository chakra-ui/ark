import { Avatar } from '@ark-ui/solid/avatar'

export const Context = () => (
  <Avatar.Root>
    <Avatar.Context>
      {(avatar) => <Avatar.Fallback>{avatar().loaded ? 'PA' : 'Loading'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
