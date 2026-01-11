<script lang="ts">
  import { Slider, useSlider } from '@ark-ui/svelte/slider'
  import button from 'styles/button.module.css'
  import styles from 'styles/slider.module.css'

  const id = $props.id()
  const slider = useSlider({ id })
</script>

<button class={button.Root} onclick={() => slider().focus()}>Focus</button>

<Slider.RootProvider value={slider} class={styles.Root}>
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
</Slider.RootProvider>
