import { Slider } from '@ark-ui/solid/slider'
import styles from 'styles/slider.module.css'

export const Context = () => {
  return (
    <Slider.Root class={styles.Root} defaultValue={[40]}>
      <Slider.Context>
        {(context) => (
          <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
            <Slider.Label class={styles.Label}>Dragging: {String(context().dragging)}</Slider.Label>
            <span class={styles.ValueText}>{context().value.join(', ')}</span>
          </div>
        )}
      </Slider.Context>
      <Slider.Control class={styles.Control}>
        <Slider.Track class={styles.Track}>
          <Slider.Range class={styles.Range} />
        </Slider.Track>
        <Slider.Thumb index={0} class={styles.Thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
