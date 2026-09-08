import { Checkbox } from '@ark-ui/solid/checkbox'
import { Tooltip } from '@ark-ui/solid/tooltip'
import { CheckIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import styles from 'styles/checkbox.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithCheckbox = () => (
  <Tooltip.Root>
    <Tooltip.Trigger
      render={(props) => (
        <Checkbox.Root {...props} class={styles.Root}>
          <Checkbox.Control class={styles.Control}>
            <Checkbox.Indicator class={styles.Indicator}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label class={styles.Label}>Accept terms</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      )}
    />
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={tooltipStyles.Content}>Required to continue</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
