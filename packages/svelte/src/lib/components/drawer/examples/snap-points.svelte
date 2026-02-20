<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/drawer.module.css'
</script>

<Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
  <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
  <Drawer.Backdrop class={styles.Backdrop} />
  <Drawer.Positioner class={styles.Positioner}>
    <Drawer.Content class={styles.Content}>
      <Drawer.Grabber class={styles.Grabber}>
        <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
      </Drawer.Grabber>
      <Drawer.Title class={styles.Title}>Drawer with Snap Points</Drawer.Title>
      <p>This drawer has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
      <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
      <Drawer.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Drawer.CloseTrigger>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
