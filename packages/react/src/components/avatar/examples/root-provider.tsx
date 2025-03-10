import { Avatar, useAvatar } from '@ark-ui/react/avatar'

export const RootProvider = () => {
  const avatar = useAvatar()

  return (
    <>
      <button onClick={() => avatar.setSrc('https://avatars.githubusercontent.com/u/6916170?v=4')}>
        Change Source
      </button>

      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/300?u=a042581f4e29026704d" alt="avatar" />
      </Avatar.RootProvider>
    </>
  )
}
