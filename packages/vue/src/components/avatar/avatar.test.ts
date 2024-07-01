import { render } from '@testing-library/vue'
import { Avatar, avatarAnatomy } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './examples/basic.vue'

describe('Avatar', () => {
  it.each(getParts(avatarAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(avatarAnatomy))('should export %s', async (part) => {
    expect(Avatar[part]).toBeDefined()
  })
})
