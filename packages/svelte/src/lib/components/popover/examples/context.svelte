<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/popover.module.css'
</script>

<Popover.Root>
  <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
  <Portal>
    <Popover.Positioner>
      <Popover.Context>
        {#snippet render(popover)}
          <Popover.Content class={styles.Content}>
            <Popover.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title class={styles.Title}>Status</Popover.Title>
            <Popover.Description class={styles.Description}>
              Popover is {popover().open ? 'visible' : 'hidden'}
            </Popover.Description>
          </Popover.Content>
        {/snippet}
      </Popover.Context>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
