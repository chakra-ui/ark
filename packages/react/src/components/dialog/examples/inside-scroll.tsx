import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const InsideScroll = () => (
  <Dialog.Root>
    <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content} style={{ maxHeight: 'min(32rem, calc(100vh - 4rem))' }}>
          <Dialog.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={styles.Title}>Terms of Service</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            Please review our terms before continuing.
          </Dialog.Description>
          <div className={styles.ScrollContainer}>
            {CONTENT_SECTIONS.map((item) => (
              <section key={item.title} className={styles.ScrollSection}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </section>
            ))}
          </div>
          <div className={styles.Actions}>
            <Dialog.CloseTrigger className={button.Root}>Decline</Dialog.CloseTrigger>
            <Dialog.CloseTrigger className={button.Root} data-variant="solid">
              Accept
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)

const CONTENT_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.',
  },
  {
    title: '2. Use License',
    body: 'Permission is granted to temporarily use this service for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title.',
  },
  {
    title: '3. User Responsibilities',
    body: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
  },
  {
    title: '4. Privacy Policy',
    body: 'Your use of this service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.',
  },
  {
    title: '5. Limitations',
    body: 'In no event shall we be liable for any damages arising out of the use or inability to use the materials on this service.',
  },
  {
    title: '6. Revisions',
    body: 'We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms.',
  },
  {
    title: '7. Governing Law',
    body: 'These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts.',
  },
]
