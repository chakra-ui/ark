import { clipboardAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { Clipboard } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './clipboard.test.vue'

describe('Clipboard', () => {
  it.each(getParts(clipboardAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(clipboardAnatomy))('should export %s', async (part) => {
    expect(Clipboard[part]).toBeDefined()
  })
})
