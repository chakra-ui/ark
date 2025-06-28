<script lang="ts">
  import { AngleSlider } from '@ark-ui/svelte/angle-slider'
</script>

<AngleSlider.Root step={15}>
  <AngleSlider.Label>Wind direction (15 step)</AngleSlider.Label>
  <AngleSlider.Control>
    <AngleSlider.Thumb />
    <AngleSlider.MarkerGroup>
      {#each [0, 45, 90, 135, 180, 225, 270, 315] as value}
        <AngleSlider.Marker {value} />
      {/each}
    </AngleSlider.MarkerGroup>
  </AngleSlider.Control>
  <AngleSlider.ValueText />
  <AngleSlider.HiddenInput />
</AngleSlider.Root>
