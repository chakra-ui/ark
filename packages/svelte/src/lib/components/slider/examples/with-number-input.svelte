<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
  import { Slider } from '@ark-ui/svelte/slider'
  import numberInput from 'styles/number-input.module.css'
  import styles from 'styles/slider.module.css'

  const min = 0
  const max = 1000
  const step = 10
  const minStepsBetweenThumbs = 5
  const gap = step * minStepsBetweenThumbs

  let value = $state<(number | null)[]>([200, 600])
  const start = $derived(value[0] ?? min)
  const end = $derived(value[1] ?? max)

  const setValueAt = (index: number, next: number | null) => {
    value = value.map((v, i) => (i === index ? next : v))
  }
</script>

<div class="stack">
  <Slider.Root
    class={styles.Root}
    {min}
    {max}
    {step}
    {minStepsBetweenThumbs}
    value={[Math.min(Math.max(start, min), max - gap), Math.min(Math.max(end, start + gap), max)]}
    onValueChange={(details) => (value = details.value)}
    getAriaLabel={({ index }) => (index === 0 ? 'Minimum price' : 'Maximum price')}
  >
    <Slider.Label class={styles.Label}>Price range</Slider.Label>
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
  <div class="hstack">
    <NumberInput.Root
      class={numberInput.Root}
      value={value[0]}
      {min}
      max={end - gap}
      {step}
      onValueChange={(details) => setValueAt(0, details.value)}
    >
      <NumberInput.Label class={numberInput.Label}>Min</NumberInput.Label>
      <NumberInput.Control class={numberInput.Control}>
        <NumberInput.Input class={numberInput.Input} />
      </NumberInput.Control>
    </NumberInput.Root>
    <NumberInput.Root
      class={numberInput.Root}
      value={value[1]}
      min={start + gap}
      {max}
      {step}
      onValueChange={(details) => setValueAt(1, details.value)}
    >
      <NumberInput.Label class={numberInput.Label}>Max</NumberInput.Label>
      <NumberInput.Control class={numberInput.Control}>
        <NumberInput.Input class={numberInput.Input} />
      </NumberInput.Control>
    </NumberInput.Root>
  </div>
</div>
