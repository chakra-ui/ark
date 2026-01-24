<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { createForm } from '@tanstack/svelte-form'
  import { Pipette } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/color-picker.module.css'

  const form = createForm(() => ({
    defaultValues: {
      color: '',
    },
    onSubmit: async ({ value }) => {
      window.alert(JSON.stringify(value))
    },
  }))
</script>

<form
  class="stack"
  onsubmit={(e) => {
    e.preventDefault()
    form.handleSubmit()
  }}
>
  <form.Field name="color">
    {#snippet children(field)}
      <ColorPicker.Root
        class={styles.Root}
        inline
        name={field.name}
        defaultValue={parseColor('#eb5e41')}
        onValueChange={(details) => field.handleChange(details.valueAsString)}
      >
        <ColorPicker.HiddenInput />

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
      </ColorPicker.Root>
    {/snippet}
  </form.Field>
  <button class={button.Root} data-variant="solid" type="submit">Submit</button>
</form>
