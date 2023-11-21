import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './color-picker.test.vue'

describe('ColorPicker', () => {
  // TODO: fix color picker value issue
  it.skip.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
