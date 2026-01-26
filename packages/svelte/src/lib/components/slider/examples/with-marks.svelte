<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
  import styles from 'styles/slider.module.css'

  const marks = [0, 25, 50, 75, 100]
</script>

<Slider.Root class={styles.Root} defaultValue={[50]}>
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
  <Slider.MarkerGroup class={styles.MarkerGroup}>
    {#each marks as value}
      <Slider.Marker {value} class={styles.Marker}>{value}</Slider.Marker>
    {/each}
  </Slider.MarkerGroup>
</Slider.Root>
