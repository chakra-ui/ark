import { render } from '@testing-library/react'
import { Avatar, type AvatarProps } from './'

const ComponentUnderTest = (props: AvatarProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
  )
}

describe('Avatar', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })
})
