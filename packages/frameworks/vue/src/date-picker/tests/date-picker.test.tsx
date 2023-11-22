import { datePickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './date-picker.test.vue'

describe('Date Picker', () => {
  it.each(getParts(datePickerAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
