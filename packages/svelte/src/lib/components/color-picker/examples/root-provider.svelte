<script lang="ts">
  import { ColorPicker, parseColor, useColorPicker } from '@ark-ui/svelte/color-picker'
  import { Check, Pipette } from 'lucide-svelte'
  import styles from 'styles/color-picker.module.css'

  const id = $props.id()
  const swatches = ['red', 'blue', 'green', 'orange']

  const colorPicker = useColorPicker({
    id,
    defaultValue: parseColor('#eb5e41'),
  })
</script>

<div class="stack">
  <output>Color: {colorPicker().valueAsString}</output>

  <ColorPicker.RootProvider class={styles.Root} value={colorPicker}>
    <ColorPicker.Label class={styles.Label}>Color</ColorPicker.Label>
    <ColorPicker.Control class={styles.Control}>
      <ColorPicker.ChannelInput class={styles.Input} channel="hex" />
      <ColorPicker.ChannelInput class={styles.ChannelInput} channel="alpha" />
      <ColorPicker.Trigger class={styles.Trigger}>
        <div class={styles.Swatch}>
          <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
          <ColorPicker.ValueSwatch class={styles.ValueSwatch} />
        </div>
      </ColorPicker.Trigger>
    </ColorPicker.Control>
    <ColorPicker.Positioner>
      <ColorPicker.Content class={styles.Content}>
        <ColorPicker.Area class={styles.Area}>
          <ColorPicker.AreaBackground class={styles.AreaBackground} />
          <ColorPicker.AreaThumb class={styles.AreaThumb} />
        </ColorPicker.Area>
        <div class={styles.SliderGroup}>
          <ColorPicker.EyeDropperTrigger class={styles.EyeDropperTrigger}>
            <Pipette />
          </ColorPicker.EyeDropperTrigger>
          <div class={styles.ChannelSliders}>
            <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="hue">
              <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
              <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="alpha">
              <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
              <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
              <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
            </ColorPicker.ChannelSlider>
          </div>
        </div>
        <ColorPicker.SwatchGroup class={styles.SwatchGroup}>
          {#each swatches as color}
            <ColorPicker.SwatchTrigger class={styles.SwatchTrigger} value={color}>
              <ColorPicker.Swatch class={styles.Swatch} value={color}>
                <ColorPicker.SwatchIndicator class={styles.SwatchIndicator}>
                  <Check />
                </ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          {/each}
        </ColorPicker.SwatchGroup>
        <ColorPicker.View class={styles.View} format="rgba">
          <div class={styles.ChannelInputGroup}>
            <ColorPicker.ChannelInput class={styles.ChannelInput} channel="hex" />
            <ColorPicker.ChannelInput class={styles.ChannelInput} channel="alpha" />
          </div>
        </ColorPicker.View>
        <ColorPicker.View class={styles.View} format="hsla">
          <div class={styles.ChannelInputGroup}>
            <ColorPicker.ChannelInput class={styles.ChannelInput} channel="hue" />
            <ColorPicker.ChannelInput class={styles.ChannelInput} channel="saturation" />
            <ColorPicker.ChannelInput class={styles.ChannelInput} channel="lightness" />
          </div>
        </ColorPicker.View>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
    <ColorPicker.HiddenInput />
  </ColorPicker.RootProvider>
</div>
