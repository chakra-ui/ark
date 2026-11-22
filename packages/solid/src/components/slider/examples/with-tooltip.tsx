import { Slider } from '@ark-ui/solid/slider'
import { Tooltip } from '@ark-ui/solid/tooltip'
import { createSignal, createUniqueId } from 'solid-js'
import { Portal } from '@solidjs/web'
import styles from 'styles/slider.module.css'
import tooltip from 'styles/tooltip.module.css'

export const WithTooltip = () => {
  const thumbId = createUniqueId()
  const [open, setOpen] = createSignal(false)

  return (
    <Slider.Root class={styles.Root} defaultValue={[40]} ids={{ thumb: () => thumbId }}>
      <Slider.Label class={styles.Label}>Volume</Slider.Label>
      <Slider.Control class={styles.Control}>
        <Slider.Track class={styles.Track}>
          <Slider.Range class={styles.Range} />
        </Slider.Track>
        <Slider.Context>
          {(slider) => (
            <Tooltip.Root
              ids={{ trigger: thumbId }}
              open={open() || slider().dragging}
              onOpenChange={(details) => setOpen(details.open)}
              openDelay={0}
              closeOnClick={false}
              closeOnPointerDown={false}
              positioning={{ placement: 'top' }}
            >
              <Tooltip.Trigger
                render={(props) => (
                  <Slider.Thumb index={0} {...props({ class: styles.Thumb })}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                )}
              />
              <Portal>
                <Tooltip.Positioner class={tooltip.Positioner}>
                  <Tooltip.Content class={tooltip.Content}>{slider().value[0]}</Tooltip.Content>
                </Tooltip.Positioner>
              </Portal>
            </Tooltip.Root>
          )}
        </Slider.Context>
      </Slider.Control>
    </Slider.Root>
  )
}
