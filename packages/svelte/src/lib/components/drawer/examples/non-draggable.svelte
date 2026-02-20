<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/drawer.module.css'
</script>

<Drawer.Root>
  <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
  <Drawer.Backdrop class={styles.Backdrop} />
  <Drawer.Positioner class={styles.Positioner}>
    <Drawer.Content class={styles.Content} draggable={false}>
      <Drawer.Grabber class={styles.Grabber}>
        <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
      </Drawer.Grabber>
      <Drawer.Title class={styles.Title}>Drawer Title</Drawer.Title>
      <p>This is the content of the drawer.</p>
      <Drawer.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Drawer.CloseTrigger>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
