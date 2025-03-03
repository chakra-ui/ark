import { Avatar } from '../'

interface Props extends Avatar.RootProps {
  src?: string
}

export const ComponentUnderTest = (props: Props) => {
  const { src, ...rest } = props
  return (
    <Avatar.Root {...rest}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src={src} alt="avatar" />
    </Avatar.Root>
  )
}
