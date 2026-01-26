import { AngleSlider } from '@ark-ui/react/angle-slider'
import styles from 'styles/angle-slider.module.css'

export const Context = () => (
  <AngleSlider.Root className={styles.Root}>
    <AngleSlider.Context>
      {(context) => <AngleSlider.Label className={styles.Label}>{context.value} degrees</AngleSlider.Label>}
    </AngleSlider.Context>
    <AngleSlider.Control className={styles.Control}>
      <AngleSlider.MarkerGroup className={styles.MarkerGroup}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((value) => (
          <AngleSlider.Marker key={value} value={value} className={styles.Marker} />
        ))}
      </AngleSlider.MarkerGroup>
      <AngleSlider.Thumb className={styles.Thumb} />
    </AngleSlider.Control>
    <AngleSlider.ValueText className={styles.ValueText} />
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
)
