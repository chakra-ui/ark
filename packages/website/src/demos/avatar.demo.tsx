import { Avatar, type AvatarProps } from '~/components/ui'

export const Demo = (props: AvatarProps) => {
  return (
    <Avatar.Root size="2xl" {...props}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
  )
}
