import { Drawer, useDrawer } from '@ark-ui/react/drawer'
import styles from 'styles/drawer-nested.module.css'

export const Nested = () => {
  const first = useDrawer({ id: 'first' })
  const second = useDrawer({ id: 'second' })
  const third = useDrawer({ id: 'third' })

  return (
    <div className={styles.main}>
      <button className={styles.button} onClick={() => first.setOpen(true)}>
        Open drawer stack
      </button>

      <Drawer.RootProvider value={first}>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Positioner className={styles.positioner}>
          <Drawer.Content className={styles.contentHost}>
            <div className={styles.popup}>
              <Drawer.Grabber className={styles.handle}>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <div className={styles.content}>
                <Drawer.Title className={styles.title}>Account</Drawer.Title>
                <p className={styles.description}>
                  Nested drawers can be styled to stack, while each drawer remains independently focus managed.
                </p>
                <div className={styles.actions}>
                  <div className={styles.actionsLeft}>
                    <button className={styles.ghostButton} onClick={() => second.setOpen(true)}>
                      Security settings
                    </button>
                  </div>
                  <Drawer.CloseTrigger className={styles.button}>Close</Drawer.CloseTrigger>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>

      <Drawer.RootProvider value={second}>
        <Drawer.Positioner className={styles.positioner}>
          <Drawer.Content className={styles.contentHost}>
            <div className={styles.popup}>
              <Drawer.Grabber className={styles.handle}>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <div className={styles.content}>
                <Drawer.Title className={styles.title}>Security</Drawer.Title>
                <p className={styles.description}>Review sign-in activity and update your security preferences.</p>
                <ul className={styles.list}>
                  <li>Passkeys enabled</li>
                  <li>2FA via authenticator app</li>
                  <li>3 signed-in devices</li>
                </ul>
                <div className={styles.actions}>
                  <div className={styles.actionsLeft}>
                    <button className={styles.ghostButton} onClick={() => third.setOpen(true)}>
                      Advanced options
                    </button>
                  </div>
                  <Drawer.CloseTrigger className={styles.button}>Close</Drawer.CloseTrigger>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>

      <Drawer.RootProvider value={third}>
        <Drawer.Positioner className={styles.positioner}>
          <Drawer.Content className={styles.contentHost}>
            <div className={styles.popup}>
              <Drawer.Grabber className={styles.handle}>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <div className={styles.content}>
                <Drawer.Title className={styles.title}>Advanced</Drawer.Title>
                <p className={styles.description}>This drawer is taller to demonstrate variable-height stacking.</p>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="device-name">
                    Device name
                  </label>
                  <input id="device-name" className={styles.input} defaultValue="Personal laptop" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="notes">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    className={styles.textarea}
                    defaultValue="Rotate recovery codes and revoke older sessions."
                    rows={3}
                  />
                </div>
                <div className={styles.actions}>
                  <Drawer.CloseTrigger className={styles.button}>Done</Drawer.CloseTrigger>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
    </div>
  )
}
