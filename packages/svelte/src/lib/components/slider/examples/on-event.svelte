<script lang="ts">
  import { Slider, type SliderValueChangeDetails } from '@ark-ui/svelte/slider'
  import styles from 'styles/slider.module.css'

  const handleValueChange = (details: SliderValueChangeDetails) => {
    console.log('onValueChange', details.value)
  }

  const handleValueChangeEnd = (details: SliderValueChangeDetails) => {
    console.log('onValueChangeEnd', details.value)
  }
</script>

<Slider.Root class={styles.Root} onValueChange={handleValueChange} onValueChangeEnd={handleValueChangeEnd}>
  <div style="display: flex; justify-content: space-between;">
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
