<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/drawer.module.css'
</script>

<Drawer.Root>
  <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
  <Drawer.Backdrop class={styles.Backdrop} />
  <Drawer.Positioner class={styles.Positioner}>
    <Drawer.Content class={styles.Content}>
      <Drawer.Grabber class={styles.Grabber}>
        <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
      </Drawer.Grabber>
      <Drawer.Title class={styles.Title}>Scrollable Drawer</Drawer.Title>
      <Drawer.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Drawer.CloseTrigger>
      <div class={styles.Scrollable}>
        {#each Array.from({ length: 50 }) as _, index}
          <div class={styles.ScrollableItem}>Item {index + 1}</div>
        {/each}
      </div>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
