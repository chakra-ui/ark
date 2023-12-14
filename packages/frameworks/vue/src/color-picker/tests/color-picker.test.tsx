import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './color-picker.test.vue'

describe('ColorPicker', () => {
  it.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
