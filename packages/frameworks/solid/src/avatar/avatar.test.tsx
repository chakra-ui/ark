import { avatarAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getParts } from '../setup-test'
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
  it.each(getParts(avatarAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
