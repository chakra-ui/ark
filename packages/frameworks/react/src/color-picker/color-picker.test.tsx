import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { getExports } from '../setup-test'
// import { ColorPicker } from '../'

describe('ColorPicker', () => {
  // TODO enable with zag 25
  it.skip.each(getExports(colorPickerAnatomy))('should export %s', async () => {
    // expect(ColorPicker[part]).toBeDefined()
  })
})
