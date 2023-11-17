import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getExports, getParts } from '../setup-test'
import { ColorPicker } from './'
import { Basic as ComponentUnderTest } from './color-picker.stories'

describe('ColorPicker', () => {
  // TODO update story with new parts
  it.skip.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    const { container } = render(() => <ComponentUnderTest />)
    expect(container.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    expect(ColorPicker[part]).toBeDefined()
  })
})
