<script lang="ts">
  import { Slider, type SliderValueChangeDetails } from '@ark-ui/svelte/slider'

  const handleValueChange = (details: SliderValueChangeDetails) => {
    console.log('value changed:', details.value)
  }

  const handleValueChangeEnd = (details: SliderValueChangeDetails) => {
    console.log('value change ended:', details.value)
  }
</script>

<Slider.Root onValueChange={handleValueChange} onValueChangeEnd={handleValueChangeEnd}>
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
</Slider.Root>
