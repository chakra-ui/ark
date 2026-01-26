import { AngleSlider } from '@ark-ui/solid/angle-slider'
import { For, createSignal } from 'solid-js'
import styles from 'styles/angle-slider.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal(45)

  return (
    <AngleSlider.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
      <AngleSlider.Label class={styles.Label}>Rotation</AngleSlider.Label>
      <AngleSlider.Control class={styles.Control}>
        <AngleSlider.MarkerGroup class={styles.MarkerGroup}>
          <For each={[0, 45, 90, 135, 180, 225, 270, 315]}>
            {(value) => <AngleSlider.Marker value={value} class={styles.Marker} />}
          </For>
        </AngleSlider.MarkerGroup>
        <AngleSlider.Thumb class={styles.Thumb} />
      </AngleSlider.Control>
      <AngleSlider.ValueText class={styles.ValueText} />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}
