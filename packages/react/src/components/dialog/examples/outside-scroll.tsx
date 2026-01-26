import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const OutsideScroll = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Dialog.Root initialFocusEl={() => contentRef.current}>
      <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Positioner className={styles.OutsideScrollPositioner}>
          <Dialog.Content
            ref={contentRef}
            className={styles.Content}
            style={{ margin: '4rem auto', maxHeight: 'none' }}
          >
            <Dialog.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
            <Dialog.Title className={styles.Title}>Privacy Policy</Dialog.Title>
            <Dialog.Description className={styles.Description}>
              This layout allows the dialog to extend beyond the viewport while keeping the outer container scrollable.
            </Dialog.Description>
            <div className={styles.Body}>
              {CONTENT_SECTIONS.map((item) => (
                <section key={item.title} className={styles.ScrollSection}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </section>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const CONTENT_SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to provide and improve our services, process transactions, send communications, and personalize your experience.',
  },
  {
    title: '3. Information Sharing',
    body: 'We do not sell your personal information. We may share information with service providers who assist in our operations, or when required by law.',
  },
  {
    title: '4. Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.',
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.',
  },
  {
    title: '6. Cookies and Tracking',
    body: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver targeted content. You can manage cookie preferences in your browser settings.',
  },
  {
    title: '7. Third-Party Services',
    body: 'Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.',
  },
  {
    title: '8. Children Privacy',
    body: 'Our services are not directed to children under 13. We do not knowingly collect personal information from children without parental consent.',
  },
  {
    title: '9. International Transfers',
    body: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email.',
  },
  {
    title: '11. Data Retention',
    body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.',
  },
  {
    title: '12. Contact Us',
    body: 'If you have questions about this privacy policy or our data practices, please contact our privacy team through the support channels provided on our website.',
  },
]
