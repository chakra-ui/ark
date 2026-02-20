<script lang="ts">
  import { Drawer, useDrawer } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/drawer.module.css'

  const drawer = useDrawer({
    defaultSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })
</script>

<div class="stack">
  <div class="hstack">
    <button class={button.Root} onclick={() => drawer().setOpen(true)}>Open via API</button>
    <button class={button.Root} onclick={() => drawer().setSnapPoint(0.25)}>Set to 25%</button>
    <button class={button.Root} onclick={() => drawer().setSnapPoint(1)}>Set to 100%</button>
  </div>

  <Drawer.RootProvider value={drawer}>
    <Drawer.Backdrop class={styles.Backdrop} />
    <Drawer.Positioner class={styles.Positioner}>
      <Drawer.Content class={styles.Content}>
        <Drawer.Grabber class={styles.Grabber}>
          <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title class={styles.Title}>Drawer with RootProvider</Drawer.Title>
        <p>This drawer is controlled via the useDrawer hook and RootProvider.</p>
        <p>Active snap point: {drawer().snapPoint}</p>
        <Drawer.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.RootProvider>
</div>
