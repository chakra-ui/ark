import { Avatar, type AvatarProps } from '~/components/ui/avatar'

export const Demo = (props: AvatarProps) => {
  return <Avatar src="https://i.pravatar.cc/300?u=a" name="John Doe" overflow="hidden" size="2xl" {...props} />
}
