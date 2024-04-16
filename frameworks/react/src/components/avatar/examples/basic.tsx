import { Avatar } from '../..'

export const Basic = (props: Avatar.RootProps) => (
  <Avatar.Root {...props}>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
