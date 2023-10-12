import { datePickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getParts } from '../setup-test'
import { Basic as ComponentUnderTest } from './date-picker.stories'

describe('Date Picker', () => {
  it.each(getParts(datePickerAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
