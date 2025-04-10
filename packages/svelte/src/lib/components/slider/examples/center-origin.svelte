<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'
</script>

<Slider.Root origin="center" defaultValue={[50]}>
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
