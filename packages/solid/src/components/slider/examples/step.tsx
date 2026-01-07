import { Slider } from '@ark-ui/solid/slider'
import styles from 'styles/slider.module.css'

export const Step = () => {
  return (
    <Slider.Root step={0.01} min={5} max={10} defaultValue={[7.5]} class={styles.Root}>
      <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
        <Slider.Label class={styles.Label}>Label</Slider.Label>
        <Slider.ValueText class={styles.ValueText} />
      </div>
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
