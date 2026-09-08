<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
  import tooltipStyles from 'styles/tooltip.module.css'
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    {#snippet render(props)}
      <Checkbox.Root {...props({ class: styles.Root })}>
        <Checkbox.Control class={styles.Control}>
          <Checkbox.Indicator class={styles.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class={styles.Label}>Accept terms</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    {/snippet}
  </Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content class={tooltipStyles.Content}>Required to continue</Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
