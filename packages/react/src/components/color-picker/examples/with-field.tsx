import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { Field } from '@ark-ui/react/field'
import field from 'styles/field.module.css'
import styles from 'styles/color-picker.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <ColorPicker.Root className={styles.Root} defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label className={styles.Label}>Label</ColorPicker.Label>
      <ColorPicker.Control className={styles.Control}>
        <ColorPicker.ChannelInput className={styles.Input} channel="hex" />
        <ColorPicker.ChannelInput className={styles.ChannelInput} channel="alpha" />
        <ColorPicker.Trigger className={styles.Trigger}>
          <div className={styles.Swatch}>
            <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
            <ColorPicker.ValueSwatch className={styles.ValueSwatch} />
          </div>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content className={styles.Content} />
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)
