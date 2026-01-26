import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const DraggingIndicator = () => {
  return (
    <Slider.Root className={styles.Root} defaultValue={[40]}>
      <Slider.Label className={styles.Label}>Label</Slider.Label>
      <Slider.Control className={styles.Control}>
        <Slider.Track className={styles.Track}>
          <Slider.Range className={styles.Range} />
        </Slider.Track>
        <Slider.Thumb index={0} className={styles.Thumb}>
          <Slider.DraggingIndicator className={styles.DraggingIndicator} />
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
