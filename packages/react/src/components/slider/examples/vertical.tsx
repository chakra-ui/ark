import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const Vertical = () => {
  return (
    <Slider.Root orientation="vertical" className={styles.Root}>
      <Slider.Label className={styles.Label}>Label</Slider.Label>
      <Slider.ValueText className={styles.ValueText} />
      <Slider.Control className={styles.Control}>
        <Slider.Track className={styles.Track}>
          <Slider.Range className={styles.Range} />
        </Slider.Track>
        <Slider.Thumb index={0} className={styles.Thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
