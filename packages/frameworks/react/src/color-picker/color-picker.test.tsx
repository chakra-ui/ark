import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { getExports } from '../setup-test'
import { ColorPicker } from './'

describe('ColorPicker', () => {
  it.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    expect(ColorPicker[part]).toBeDefined()
  })
})
