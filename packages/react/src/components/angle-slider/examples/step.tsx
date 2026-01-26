import { AngleSlider } from '@ark-ui/react/angle-slider'
import styles from 'styles/angle-slider.module.css'

export const Step = () => {
  return (
    <AngleSlider.Root className={styles.Root} step={15}>
      <AngleSlider.Label className={styles.Label}>15 Step</AngleSlider.Label>
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
}
