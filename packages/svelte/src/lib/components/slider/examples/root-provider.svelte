<script lang="ts">
  import { Slider, useSlider } from '@ark-ui/svelte/slider'

  const slider = useSlider()
</script>

<button onclick={() => slider().focus()}>Focus</button>

<Slider.RootProvider value={slider}>
  <Slider.Label>Label</Slider.Label>
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.RootProvider>
