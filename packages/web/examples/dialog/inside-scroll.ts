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

const terms = [
  [
    '1. Acceptance of Terms',
    'By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.',
  ],
  [
    '2. Use License',
    'Permission is granted to temporarily use this service for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title.',
  ],
  [
    '3. User Responsibilities',
    'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
  ],
  [
    '4. Privacy Policy',
    'Your use of this service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.',
  ],
  [
    '5. Limitations',
    'In no event shall we be liable for any damages arising out of the use or inability to use the materials on this service.',
  ],
  [
    '6. Revisions',
    'We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms.',
  ],
  [
    '7. Governing Law',
    'These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts.',
  ],
]

export function mount(root: HTMLElement) {
  root.innerHTML = dialogMarkup(
    '',
    openButton('Open Dialog'),
    `${closeButton}
     ${heading('Terms of Service', 'Please review our terms before continuing.')}
     <div class="${styles.ScrollContainer}">${sections(terms)}</div>
     <div class="${styles.Actions}">
       <ark-dialog-close-trigger><button class="${button.Root}">Decline</button></ark-dialog-close-trigger>
       <ark-dialog-close-trigger><button class="${button.Root}" data-variant="solid">Accept</button></ark-dialog-close-trigger>
     </div>`,
    'style="max-height: min(32rem, calc(100vh - 4rem))"',
  )
}
