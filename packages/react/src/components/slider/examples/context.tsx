import { Slider } from '@ark-ui/react/slider'
import styles from 'styles/slider.module.css'

export const Context = () => {
  return (
    <Slider.Root className={styles.Root} defaultValue={[40]}>
      <Slider.Context>
        {(context) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Slider.Label className={styles.Label}>Dragging: {String(context.dragging)}</Slider.Label>
            <span className={styles.ValueText}>{context.value.join(', ')}</span>
          </div>
        )}
      </Slider.Context>
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
