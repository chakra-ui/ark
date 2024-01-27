import { Avatar, type AvatarRootProps } from '../'

export const ComponentUnderTest = (props: AvatarRootProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
  )
}
