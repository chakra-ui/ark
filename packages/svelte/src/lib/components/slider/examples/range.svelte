<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
  import styles from 'styles/slider.module.css'
</script>

<Slider.Root defaultValue={[30, 60]} class={styles.Root}>
  <Slider.Label class={styles.Label}>Label</Slider.Label>
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
