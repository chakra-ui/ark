import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const Range = () => {
  return (
    <Slider.Root defaultValue={[30, 60]} className={styles.Root}>
      <Slider.Label className={styles.Label}>Label</Slider.Label>
      <Slider.Control className={styles.Control}>
        <Slider.Track className={styles.Track}>
          <Slider.Range className={styles.Range} />
        </Slider.Track>
        <Slider.Thumb index={0} className={styles.Thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1} className={styles.Thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
