<script lang="ts">
  import { Slider } from '@ark-ui/svelte/slider'

  let value = $state([40])
</script>

<button type="button" onclick={() => (value = [60])}>set 60</button>
<Slider.Root bind:value>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
<output data-testid="value">{value.join(',')}</output>
