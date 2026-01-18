<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import styles from 'styles/color-picker.module.css'
</script>

<ColorPicker.Root class={styles.Root} disabled defaultValue={parseColor('#eb5e41')}>
  <ColorPicker.Label class={styles.Label}>Color</ColorPicker.Label>
  <ColorPicker.Control class={styles.Control}>
    <ColorPicker.ChannelInput class={styles.Input} channel="hex" />
    <ColorPicker.Trigger class={styles.Trigger}>
      <div class={styles.Swatch}>
        <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
        <ColorPicker.ValueSwatch class={styles.ValueSwatch} />
      </div>
    </ColorPicker.Trigger>
  </ColorPicker.Control>
  <ColorPicker.HiddenInput />
</ColorPicker.Root>
