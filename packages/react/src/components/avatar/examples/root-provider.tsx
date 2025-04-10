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
        <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" alt="avatar" />
      </Avatar.RootProvider>
    </>
  )
}
