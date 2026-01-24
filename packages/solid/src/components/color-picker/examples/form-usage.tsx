import { ColorPicker, parseColor } from '@ark-ui/solid/color-picker'
import { createForm, setValue } from '@modular-forms/solid'
import { Pipette } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/color-picker.module.css'

export const FormUsage = () => {
  const [formStore, { Form, Field }] = createForm<{ color: string }>()

  return (
    <Form
      class="stack"
      onSubmit={(data) => {
        window.alert(JSON.stringify(data))
      }}
    >
      <Field name="color">
        {(field) => (
          <ColorPicker.Root
            class={styles.Root}
            inline
            name={field.name}
            defaultValue={parseColor('#eb5e41')}
            onValueChange={(details) => setValue(formStore, 'color', details.valueAsString)}
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
        )}
      </Field>
      <button class={button.Root} data-variant="solid" type="submit">
        Submit
      </button>
    </Form>
  )
}
