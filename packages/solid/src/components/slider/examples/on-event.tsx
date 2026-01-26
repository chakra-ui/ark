import { Slider } from '@ark-ui/solid/slider'
import styles from 'styles/slider.module.css'

export const OnEvent = () => {
  return (
    <Slider.Root
      onValueChange={(details) => console.log('onValueChange', details.value)}
      onValueChangeEnd={(details) => console.log('onValueChangeEnd', details.value)}
      class={styles.Root}
    >
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
