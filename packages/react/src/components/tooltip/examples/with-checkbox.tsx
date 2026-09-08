import { Checkbox } from '@ark-ui/react/checkbox'
import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithCheckbox = () => (
  <Tooltip.Root>
    <Tooltip.Trigger
      render={
        <Checkbox.Root className={styles.Root}>
          <Checkbox.Control className={styles.Control}>
            <Checkbox.Indicator className={styles.Indicator}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label className={styles.Label}>Accept terms</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      }
    />
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content className={tooltipStyles.Content}>Required to continue</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
