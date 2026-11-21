import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

const dialogMarkup = (
  attrs: string,
  trigger: string,
  content: string,
  contentAttrs = '',
  positioner = styles.Positioner,
) => `
  <ark-dialog ${attrs}>
    ${trigger}
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${positioner}">
      <ark-dialog-content class="${styles.Content}" ${contentAttrs}>${content}</ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const openButton = (label: string) =>
  `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

const closeButton = `<ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>`

const heading = (title: string, description: string) => `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

const sections = (items: string[][]) =>
  items
    .map(([title, body]) => `<section class="${styles.ScrollSection}"><h3>${title}</h3><p>${body}</p></section>`)
    .join('')

const policy = [
  [
    '1. Information We Collect',
    'We collect information you provide directly, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.',
  ],
  [
    '2. How We Use Your Information',
    'We use the information we collect to provide and improve our services, process transactions, send communications, and personalize your experience.',
  ],
  [
    '3. Information Sharing',
    'We do not sell your personal information. We may share information with service providers who assist in our operations, or when required by law.',
  ],
  [
    '4. Data Security',
    'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.',
  ],
  [
    '5. Your Rights',
    'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.',
  ],
  [
    '6. Cookies and Tracking',
    'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver targeted content. You can manage cookie preferences in your browser settings.',
  ],
  [
    '7. Third-Party Services',
    'Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.',
  ],
  [
    '8. Children Privacy',
    'Our services are not directed to children under 13. We do not knowingly collect personal information from children without parental consent.',
  ],
  [
    '9. International Transfers',
    'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
  ],
  [
    '10. Changes to This Policy',
    'We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email.',
  ],
  [
    '11. Data Retention',
    'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.',
  ],
  [
    '12. Contact Us',
    'If you have questions about this privacy policy or our data practices, please contact our privacy team through the support channels provided on our website.',
  ],
]

export function mount(root: HTMLElement) {
  root.innerHTML = dialogMarkup(
    'initial-focus="ark-dialog-content"',
    openButton('Open Dialog'),
    `${closeButton}
     ${heading('Privacy Policy', 'This layout allows the dialog to extend beyond the viewport while keeping the outer container scrollable.')}
     <div class="${styles.Body}">${sections(policy)}</div>`,
    'style="margin: 4rem auto; max-height: none"',
    styles.OutsideScrollPositioner,
  )
}
