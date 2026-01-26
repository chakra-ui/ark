import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { PipetteIcon } from 'lucide-react'
import styles from 'styles/color-picker.module.css'

export const InputOnly = () => {
  return (
    <ColorPicker.Root className={styles.Root} defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label className={styles.Label}>Color</ColorPicker.Label>
      <ColorPicker.Control className={styles.Control}>
        <ColorPicker.ValueSwatch className={styles.Swatch} />
        <ColorPicker.ChannelInput className={styles.Input} channel="hex" />
        <ColorPicker.EyeDropperTrigger className={styles.EyeDropperTrigger}>
          <PipetteIcon />
        </ColorPicker.EyeDropperTrigger>
      </ColorPicker.Control>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}
