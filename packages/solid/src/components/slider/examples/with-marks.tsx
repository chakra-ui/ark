import { Slider } from '@ark-ui/solid/slider'
import { For } from 'solid-js'
import styles from 'styles/slider.module.css'

export const WithMarks = () => {
  return (
    <Slider.Root class={styles.Root} defaultValue={[50]}>
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
      <Slider.MarkerGroup class={styles.MarkerGroup}>
        <For each={[0, 25, 50, 75, 100]}>
          {(value) => (
            <Slider.Marker value={value} class={styles.Marker}>
              {value}
            </Slider.Marker>
          )}
        </For>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
