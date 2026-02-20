<script lang="ts">
  import { Drawer, type DrawerOpenChangeDetails } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/drawer.module.css'

  let open = $state(false)

  const handleOpenChange = (details: DrawerOpenChangeDetails) => {
    open = details.open
  }
</script>

<button class={button.Root} onclick={() => (open = !open)}>
  {open ? 'Close' : 'Open'} Drawer
</button>

<Drawer.Root {open} onOpenChange={handleOpenChange}>
  <Drawer.Backdrop class={styles.Backdrop} />
  <Drawer.Positioner class={styles.Positioner}>
    <Drawer.Content class={styles.Content}>
      <Drawer.Grabber class={styles.Grabber}>
        <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
      </Drawer.Grabber>
      <Drawer.Title class={styles.Title}>Controlled Drawer</Drawer.Title>
      <p>This drawer is controlled via state.</p>
      <Drawer.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Drawer.CloseTrigger>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
