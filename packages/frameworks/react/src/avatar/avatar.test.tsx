import { avatarAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/react'
import { getExports, getParts } from '../setup-test'
import { Avatar, type AvatarRootProps } from './'

const ComponentUnderTest = (props: AvatarRootProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
  )
}

describe('Avatar', () => {
  it.each(getParts(avatarAnatomy))('should render part %s', async (part) => {
    render(<ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(avatarAnatomy))('should export %s', async (part) => {
    expect(Avatar[part]).toBeDefined()
  })
})
