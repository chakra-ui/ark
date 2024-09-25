import { ColorPicker, parseColor } from '../..'
import { ColorPickerSwatch } from './_template'

export const SwatchOnly = () => {
  return (
    <ColorPicker.Root open defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Content>
        <div>
          <div>Selected color:</div>
          <ColorPicker.ValueText />
        </div>
        <ColorPicker.SwatchGroup>
          <ColorPickerSwatch value="red" />
          <ColorPickerSwatch value="pink" />
          <ColorPickerSwatch value="orange" />
          <ColorPickerSwatch value="purple" />
        </ColorPicker.SwatchGroup>
      </ColorPicker.Content>
    </ColorPicker.Root>
  )
}
