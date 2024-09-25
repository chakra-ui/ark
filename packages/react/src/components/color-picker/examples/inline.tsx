import { ColorPicker, parseColor } from '../..'
import { ColorPickerContent } from './_template'

export const Inline = () => {
  return (
    <ColorPicker.Root open defaultValue={parseColor('#eb5e41')}>
      <ColorPickerContent />
    </ColorPicker.Root>
  )
}
