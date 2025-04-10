<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
</script>

<Slider.Root>
  <Slider.Label>Label</Slider.Label>
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.DraggingIndicator />
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
