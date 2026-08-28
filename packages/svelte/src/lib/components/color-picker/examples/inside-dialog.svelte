<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Pipette, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import dialog from 'styles/dialog.module.css'
  import styles from 'styles/color-picker.module.css'
</script>

<Dialog.Root>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={dialog.Backdrop} />
    <Dialog.Positioner class={dialog.Positioner}>
      <Dialog.Content class={dialog.Content}>
        <Dialog.CloseTrigger class={dialog.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={dialog.Title}>Choose a color</Dialog.Title>
        <Dialog.Description class={dialog.Description}>
          Wrap the positioner in a portal so the popover appears above the dialog.
        </Dialog.Description>
        <div class={dialog.Body}>
          <ColorPicker.Root class={styles.Root} defaultValue={parseColor('#eb5e41')} lazyMount unmountOnExit>
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

            <Portal>
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
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
            <ColorPicker.HiddenInput />
          </ColorPicker.Root>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
