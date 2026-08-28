<script lang="ts">
  import { AngleSlider, useAngleSlider } from '@ark-ui/svelte/angle-slider'
  import button from 'styles/button.module.css'
  import styles from 'styles/angle-slider.module.css'

  const id = $props.id()
  const angleSlider = useAngleSlider({ id })
</script>

<div class="stack">
  <AngleSlider.RootProvider class={styles.Root} value={angleSlider}>
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
  </AngleSlider.RootProvider>

  <button class={button.Root} onclick={() => angleSlider().setValue(90)}>Set to 90</button>
</div>
