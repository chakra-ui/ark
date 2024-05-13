import { Avatar, useAvatar } from '..'

export const External = () => {
  const api = useAvatar({ onStatusChange: (e) => console.log('status changed', e) })

  return (
    <Avatar.Root api={api}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
  )
}
