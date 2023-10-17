import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { ColorPicker } from '../'
import { getExports } from '../setup-test'

describe('ColorPicker', () => {
  it.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    expect(ColorPicker[part]).toBeDefined()
  })
})
