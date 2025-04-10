<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
</script>

<Slider.Root minStepsBetweenThumbs={5} value={[5, 60]}>
  <Slider.Label>Label</Slider.Label>
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
    <Slider.Thumb index={1}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
