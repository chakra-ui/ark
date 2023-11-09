import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getParts } from '../setup-test'
import { Basic as ComponentUnderTest } from './color-picker.stories'

describe('ColorPicker', () => {
  it.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    const { container } = render(() => <ComponentUnderTest />)
    expect(container.querySelector(part)).toBeInTheDocument()
  })
})
