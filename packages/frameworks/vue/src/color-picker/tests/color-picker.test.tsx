import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { ColorPicker } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './color-picker.test.vue'

describe('ColorPicker', () => {
  it.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    expect(ColorPicker[part]).toBeDefined()
  })
})
