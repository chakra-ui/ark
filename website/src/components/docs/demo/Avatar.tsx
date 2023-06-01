import { avatar } from '@/panda/recipes'
import { Avatar, AvatarFallback, AvatarImage } from '@ark-ui/react'

export const DemoAvatar = () => (
  <Avatar className={avatar()}>
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar>
)
