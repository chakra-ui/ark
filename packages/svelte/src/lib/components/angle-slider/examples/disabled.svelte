<script lang="ts">
  import { AngleSlider } from '@ark-ui/svelte/angle-slider'
  import styles from 'styles/angle-slider.module.css'
</script>

<AngleSlider.Root class={styles.Root} disabled defaultValue={45}>
  <AngleSlider.Label class={styles.Label}>Rotation</AngleSlider.Label>
  <AngleSlider.Control class={styles.Control}>
    <AngleSlider.MarkerGroup class={styles.MarkerGroup}>
      {#each [0, 45, 90, 135, 180, 225, 270, 315] as value}
        <AngleSlider.Marker {value} class={styles.Marker} />
      {/each}
    </AngleSlider.MarkerGroup>
    <AngleSlider.Thumb class={styles.Thumb} />
  </AngleSlider.Control>
  <AngleSlider.ValueText class={styles.ValueText} />
  <AngleSlider.HiddenInput />
</AngleSlider.Root>
