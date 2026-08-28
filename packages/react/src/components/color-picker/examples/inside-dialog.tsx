import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { PipetteIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/color-picker.module.css'

export const InsideDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={dialog.Backdrop} />
      <Dialog.Positioner className={dialog.Positioner}>
        <Dialog.Content className={dialog.Content}>
          <Dialog.CloseTrigger className={dialog.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={dialog.Title}>Choose a color</Dialog.Title>
          <Dialog.Description className={dialog.Description}>
            Wrap the positioner in a portal so the popover appears above the dialog.
          </Dialog.Description>
          <div className={dialog.Body}>
            <ColorPicker.Root className={styles.Root} defaultValue={parseColor('#eb5e41')} lazyMount unmountOnExit>
              <ColorPicker.Label className={styles.Label}>Color</ColorPicker.Label>

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

              <Portal>
                <ColorPicker.Positioner>
                  <ColorPicker.Content className={styles.Content}>
                    <ColorPicker.Area className={styles.Area}>
                      <ColorPicker.AreaBackground className={styles.AreaBackground} />
                      <ColorPicker.AreaThumb className={styles.AreaThumb} />
                    </ColorPicker.Area>
                    <div className={styles.SliderGroup}>
                      <ColorPicker.EyeDropperTrigger className={styles.EyeDropperTrigger}>
                        <PipetteIcon />
                      </ColorPicker.EyeDropperTrigger>
                      <div className={styles.ChannelSliders}>
                        <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="hue">
                          <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
                          <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
                        </ColorPicker.ChannelSlider>
                        <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="alpha">
                          <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
                          <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
                          <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
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
)
