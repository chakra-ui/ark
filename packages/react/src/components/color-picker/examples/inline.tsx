import { ColorPicker } from '../..'
import { ColorPickerContent } from './_template'

export const Inline = () => {
  return (
    <ColorPicker.Root open defaultValue="#eb5e41">
      <ColorPickerContent />
    </ColorPicker.Root>
  )
}
