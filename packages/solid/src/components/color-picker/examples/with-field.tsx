import { ColorPicker, parseColor } from '@ark-ui/solid/color-picker'
import { Field } from '@ark-ui/solid/field'
import field from 'styles/field.module.css'
import styles from 'styles/color-picker.module.css'

export const WithField = () => (
  <Field.Root class={field.Root}>
    <ColorPicker.Root class={styles.Root} defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label class={styles.Label}>Label</ColorPicker.Label>
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
        <ColorPicker.Content class={styles.Content} />
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
    <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)
