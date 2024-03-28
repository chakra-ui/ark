import { Avatar, type AvatarProps } from '~/components/ui/avatar'

export const Demo = (props: AvatarProps) => {
  return <Avatar src="https://i.pravatar.cc/300" name="John Doe" {...props} />
}
