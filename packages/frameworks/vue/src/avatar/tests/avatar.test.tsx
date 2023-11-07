import { avatarAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './avatar.test.vue'

describe('Avatar', () => {
  it.each(getParts(avatarAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should render', async () => {
    render(ComponentUnderTest)
  })
})
