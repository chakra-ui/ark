import { AngleSlider } from '@ark-ui/solid/angle-slider'
import { For } from 'solid-js'
import styles from 'styles/angle-slider.module.css'

export const Context = () => (
  <AngleSlider.Root class={styles.Root}>
    <AngleSlider.Context>
      {(context) => <AngleSlider.Label class={styles.Label}>{context().value} degrees</AngleSlider.Label>}
    </AngleSlider.Context>
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
