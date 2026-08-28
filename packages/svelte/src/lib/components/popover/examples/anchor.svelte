<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import field from 'styles/field.module.css'
  import styles from 'styles/popover.module.css'
</script>

<Popover.Root>
  <div class="hstack">
    <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
    <Popover.Anchor class={styles.Anchor}>
      <input class={field.Input} placeholder="Type here..." />
    </Popover.Anchor>
  </div>

  <Popover.Positioner class={styles.Positioner}>
    <Popover.Content class={styles.Content}>
      <Popover.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Popover.CloseTrigger>
      <Popover.Title class={styles.Title}>Title</Popover.Title>
      <Popover.Description class={styles.Description}>Description</Popover.Description>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
