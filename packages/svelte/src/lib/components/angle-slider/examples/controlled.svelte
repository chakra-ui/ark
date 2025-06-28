<script lang="ts">
  import { AngleSlider } from '@ark-ui/svelte/angle-slider'

  let value = $state(180)
</script>

<AngleSlider.Root bind:value>
  <AngleSlider.Label>Temperature</AngleSlider.Label>
  <AngleSlider.Control>
    <AngleSlider.Thumb />
    <AngleSlider.MarkerGroup>
      {#each [0, 45, 90, 135, 180, 225, 270, 315] as value}
        <AngleSlider.Marker {value} />
      {/each}
    </AngleSlider.MarkerGroup>
  </AngleSlider.Control>
  <AngleSlider.ValueText>{value} ºC</AngleSlider.ValueText>
  <AngleSlider.HiddenInput />
</AngleSlider.Root>
