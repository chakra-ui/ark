import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from '~/components/ui/avatar'

export const AvatarDemo = (props: AvatarProps) => {
  return (
    <Avatar size="2xl" {...props}>
      <AvatarFallback>PA</AvatarFallback>
      <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar>
  )
}
