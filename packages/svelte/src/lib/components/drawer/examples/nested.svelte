<script lang="ts">
  import { Drawer, useDrawer } from '@ark-ui/svelte/drawer'
  import styles from 'styles/drawer-nested.module.css'

  const first = useDrawer({ id: 'first' })
  const second = useDrawer({ id: 'second' })
  const third = useDrawer({ id: 'third' })
</script>

<div class={styles.main}>
  <button class={styles.button} onclick={() => first().setOpen(true)}>Open drawer stack</button>

  <Drawer.RootProvider value={first}>
    <Drawer.Backdrop class={styles.backdrop} />
    <Drawer.Positioner class={styles.positioner}>
      <Drawer.Content class={styles.contentHost}>
        <div class={styles.popup}>
          <Drawer.Grabber class={styles.handle}>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <div class={styles.content}>
            <Drawer.Title class={styles.title}>Account</Drawer.Title>
            <p class={styles.description}>
              Nested drawers can be styled to stack, while each drawer remains independently focus managed.
            </p>
            <div class={styles.actions}>
              <div class={styles.actionsLeft}>
                <button class={styles.ghostButton} onclick={() => second().setOpen(true)}>Security settings</button>
              </div>
              <Drawer.CloseTrigger class={styles.button}>Close</Drawer.CloseTrigger>
            </div>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.RootProvider>

  <Drawer.RootProvider value={second}>
    <Drawer.Positioner class={styles.positioner}>
      <Drawer.Content class={styles.contentHost}>
        <div class={styles.popup}>
          <Drawer.Grabber class={styles.handle}>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <div class={styles.content}>
            <Drawer.Title class={styles.title}>Security</Drawer.Title>
            <p class={styles.description}>Review sign-in activity and update your security preferences.</p>
            <ul class={styles.list}>
              <li>Passkeys enabled</li>
              <li>2FA via authenticator app</li>
              <li>3 signed-in devices</li>
            </ul>
            <div class={styles.actions}>
              <div class={styles.actionsLeft}>
                <button class={styles.ghostButton} onclick={() => third().setOpen(true)}>Advanced options</button>
              </div>
              <Drawer.CloseTrigger class={styles.button}>Close</Drawer.CloseTrigger>
            </div>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.RootProvider>

  <Drawer.RootProvider value={third}>
    <Drawer.Positioner class={styles.positioner}>
      <Drawer.Content class={styles.contentHost}>
        <div class={styles.popup}>
          <Drawer.Grabber class={styles.handle}>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <div class={styles.content}>
            <Drawer.Title class={styles.title}>Advanced</Drawer.Title>
            <p class={styles.description}>This drawer is taller to demonstrate variable-height stacking.</p>
            <div class={styles.field}>
              <label class={styles.label} for="device-name">Device name</label>
              <input id="device-name" class={styles.input} value="Personal laptop" />
            </div>
            <div class={styles.field}>
              <label class={styles.label} for="notes">Notes</label>
              <textarea id="notes" class={styles.textarea} rows={3}
                >Rotate recovery codes and revoke older sessions.</textarea
              >
            </div>
            <div class={styles.actions}>
              <Drawer.CloseTrigger class={styles.button}>Done</Drawer.CloseTrigger>
            </div>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.RootProvider>
</div>
