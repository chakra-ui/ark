import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'blue', 'green', 'orange']

export const Inline = () => {
  return (
    <ColorPicker.Root className={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Area className={styles.Area}>
        <ColorPicker.AreaBackground className={styles.AreaBackground} />
        <ColorPicker.AreaThumb className={styles.AreaThumb} />
      </ColorPicker.Area>

      <ColorPicker.SwatchGroup className={styles.SwatchGroup}>
        {swatches.map((color) => (
          <ColorPicker.SwatchTrigger key={color} className={styles.SwatchTrigger} value={color}>
            <ColorPicker.Swatch className={styles.Swatch} value={color}>
              <ColorPicker.SwatchIndicator className={styles.SwatchIndicator}>
                <CheckIcon />
              </ColorPicker.SwatchIndicator>
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.SwatchGroup>
    </ColorPicker.Root>
  )
}
