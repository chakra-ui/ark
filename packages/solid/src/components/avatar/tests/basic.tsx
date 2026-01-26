import { Avatar } from '../'

export const ComponentUnderTest = (props: Avatar.RootProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300?u=a" alt="avatar" />
    </Avatar.Root>
  )
}
