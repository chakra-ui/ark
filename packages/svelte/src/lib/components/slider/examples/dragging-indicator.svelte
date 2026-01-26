<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
  import styles from 'styles/slider.module.css'
</script>

<Slider.Root class={styles.Root} defaultValue={[40]}>
  <Slider.Label class={styles.Label}>Label</Slider.Label>
  <Slider.Control class={styles.Control}>
    <Slider.Track class={styles.Track}>
      <Slider.Range class={styles.Range} />
    </Slider.Track>
    <Slider.Thumb index={0} class={styles.Thumb}>
      <Slider.DraggingIndicator class={styles.DraggingIndicator} />
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
