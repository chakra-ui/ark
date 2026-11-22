import { Portal } from '@ark-ui/react/portal'
import { Slider } from '@ark-ui/react/slider'
import { Tooltip } from '@ark-ui/react/tooltip'
import { useId, useState } from 'react'
import styles from 'styles/slider.module.css'
import tooltip from 'styles/tooltip.module.css'

export const WithTooltip = () => {
  const thumbId = useId()
  const [open, setOpen] = useState(false)

  return (
    <Slider.Root className={styles.Root} defaultValue={[40]} ids={{ thumb: () => thumbId }}>
      <Slider.Label className={styles.Label}>Volume</Slider.Label>
      <Slider.Control className={styles.Control}>
        <Slider.Track className={styles.Track}>
          <Slider.Range className={styles.Range} />
        </Slider.Track>
        <Slider.Context>
          {(slider) => (
            <Tooltip.Root
              ids={{ trigger: thumbId }}
              open={open || slider.dragging}
              onOpenChange={(details) => setOpen(details.open)}
              openDelay={0}
              closeOnClick={false}
              closeOnPointerDown={false}
              positioning={{ placement: 'top' }}
            >
              <Tooltip.Trigger
                render={
                  <Slider.Thumb index={0} className={styles.Thumb}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                }
              />
              <Portal>
                <Tooltip.Positioner className={tooltip.Positioner}>
                  <Tooltip.Content className={tooltip.Content}>{slider.value[0]}</Tooltip.Content>
                </Tooltip.Positioner>
              </Portal>
            </Tooltip.Root>
          )}
        </Slider.Context>
      </Slider.Control>
    </Slider.Root>
  )
}
