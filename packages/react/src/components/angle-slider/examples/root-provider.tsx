import { AngleSlider, useAngleSlider } from '@ark-ui/react/angle-slider'
import button from 'styles/button.module.css'
import styles from 'styles/angle-slider.module.css'

export const RootProvider = () => {
  const angleSlider = useAngleSlider()

  return (
    <div className="stack">
      <AngleSlider.RootProvider className={styles.Root} value={angleSlider}>
        <AngleSlider.Label className={styles.Label}>Rotation</AngleSlider.Label>
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
      </AngleSlider.RootProvider>

      <button className={button.Root} onClick={() => angleSlider.setValue(90)}>
        Set to 90
      </button>
    </div>
  )
}
