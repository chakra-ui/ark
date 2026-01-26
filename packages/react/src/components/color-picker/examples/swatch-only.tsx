import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'pink', 'orange', 'purple']

export const SwatchOnly = () => {
  return (
    <ColorPicker.Root className={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
      <output>
        Selected color: <ColorPicker.ValueText className={styles.ValueText} />
      </output>
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
