<script lang="ts">
  import { LocaleProvider } from '@ark-ui/svelte/locale'
  import { Slider } from '@ark-ui/svelte/slider'

  const { locale = 'en-US', ...props }: Slider.RootProps & { locale?: string } = $props()
</script>

<LocaleProvider {locale}>
  <Slider.Root min={-50} max={50} defaultValue={[-20, 20]} {...props}>
    <Slider.Label>Quantity</Slider.Label>
    <Slider.ValueText data-testid="value-text" />
    <Slider.Control data-testid="control">
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
    <Slider.MarkerGroup>
      <Slider.Marker value={-30}>-30</Slider.Marker>
      <Slider.Marker value={0}>0</Slider.Marker>
      <Slider.Marker value={30}>30</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
</LocaleProvider>
