import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const CenterOrigin = () => {
  return (
    <Slider.Root origin="center" className={styles.Root} defaultValue={[75]}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Slider.Label className={styles.Label}>Label</Slider.Label>
        <Slider.ValueText className={styles.ValueText} />
      </div>
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
