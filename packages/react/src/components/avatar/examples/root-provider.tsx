import { Avatar, useAvatar } from '@ark-ui/react/avatar'
import { useState } from 'react'

const images = [
  'https://avatars.githubusercontent.com/u/1846056?v=4',
  'https://avatars.githubusercontent.com/u/6916170?v=4',
]
export const RootProvider = () => {
  const avatar = useAvatar()
  const [index, setIndex] = useState(0)
  const src = images[index]

  return (
    <>
      <button onClick={() => setIndex((index + 1) % images.length)}>Change Source</button>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src={src} alt="avatar" />
      </Avatar.RootProvider>
    </>
  )
}
