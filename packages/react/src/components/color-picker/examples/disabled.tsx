import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import styles from 'styles/color-picker.module.css'

export const Disabled = () => {
  return (
    <ColorPicker.Root className={styles.Root} disabled defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label className={styles.Label}>Color</ColorPicker.Label>
      <ColorPicker.Control className={styles.Control}>
        <ColorPicker.ChannelInput className={styles.Input} channel="hex" />
        <ColorPicker.Trigger className={styles.Trigger}>
          <div className={styles.Swatch}>
            <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
            <ColorPicker.ValueSwatch className={styles.ValueSwatch} />
          </div>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}
