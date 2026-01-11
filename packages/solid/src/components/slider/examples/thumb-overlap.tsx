import { Slider } from '@ark-ui/solid/slider'
import styles from 'styles/slider.module.css'

export const ThumbOverlap = () => {
  return (
    <Slider.Root minStepsBetweenThumbs={5} defaultValue={[25, 60]} class={styles.Root}>
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
        <Slider.Thumb index={1} class={styles.Thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
