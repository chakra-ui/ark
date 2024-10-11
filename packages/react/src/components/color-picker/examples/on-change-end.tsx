import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { useState } from 'react'
import { ColorPickerContent } from './_template'

export const OnChangeEnd = () => {
  const [color, setColor] = useState(parseColor('rgba(186, 43, 186, 1)'))

  return (
    <ColorPicker.Root value={color} onValueChangeEnd={(details) => setColor(details.value)}>
      <ColorPicker.Control>
        <p>Current color value: {color.toString('rgba')}</p>

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
