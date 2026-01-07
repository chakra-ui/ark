import { Slider } from '@ark-ui/solid/slider'
import styles from 'styles/slider.module.css'

export const Vertical = () => {
  return (
    <Slider.Root orientation="vertical" class={styles.Root}>
      <Slider.Label class={styles.Label}>Label</Slider.Label>
      <Slider.ValueText class={styles.ValueText} />
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
