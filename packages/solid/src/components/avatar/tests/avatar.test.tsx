import { render } from '@solidjs/testing-library'
import { anatomy } from '@zag-js/avatar'
import { Avatar } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Avatar', () => {
  it.each(getParts(anatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Avatar[part]).toBeDefined()
  })
})
