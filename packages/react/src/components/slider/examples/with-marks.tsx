import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const WithMarks = () => {
  return (
    <Slider.Root className={styles.Root} defaultValue={[50]}>
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
      <Slider.MarkerGroup className={styles.MarkerGroup}>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider.Marker key={value} value={value} className={styles.Marker}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
