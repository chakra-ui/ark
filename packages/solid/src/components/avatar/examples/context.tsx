import { Avatar } from '../..'

export const Context = () => (
  <Avatar.Root>
    <Avatar.Context>
      {(api) => <Avatar.Fallback>{api().loaded ? 'Loading' : 'PA'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
