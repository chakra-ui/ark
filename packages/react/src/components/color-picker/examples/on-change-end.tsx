import { useState } from 'react'
import { ColorPicker } from '../..'
import { ColorPickerContent } from './_template'

export const OnChangeEnd = () => {
  const [color, setColor] = useState('rgba(186, 43, 186, 1)')

  return (
    <ColorPicker.Root value={color} onValueChangeEnd={(details) => setColor(details.valueAsString)}>
      <ColorPicker.Control>
        <p>Current color value: {color}</p>

        <ColorPicker.Trigger>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.Context>
            {(colorPicker) => <ColorPicker.Swatch value={colorPicker.value} />}
          </ColorPicker.Context>
        </ColorPicker.Trigger>
      </ColorPicker.Control>

      <ColorPicker.Positioner>
        <ColorPickerContent />
      </ColorPicker.Positioner>

      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}
