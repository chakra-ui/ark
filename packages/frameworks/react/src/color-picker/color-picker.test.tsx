import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { getExports } from '../setup-test'

describe('ColorPicker', () => {
  it.skip.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    // expect(ColorPicker[part]).toBeDefined()
  })
})
