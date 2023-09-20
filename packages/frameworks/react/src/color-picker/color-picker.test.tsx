import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { getExports } from '../setup-test'
import { ColorPicker } from './'

describe('ColorPicker', () => {
  it.skip.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    // @ts-expect-error TODO
    expect(ColorPicker[part]).toBeDefined()
  })
})
