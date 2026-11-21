import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

const closeAction = ({ label, solid = false }: { label: string; solid?: boolean }) =>
  /* html */ `<ark-dialog-close-trigger><button class="${button.Root}" ${solid ? 'data-variant="solid"' : ''}>${label}</button></ark-dialog-close-trigger>`

const section = ({ title, body }: { title: string; body: string }) =>
  /* html */ `<section class="${styles.ScrollSection}"><h3>${title}</h3><p>${body}</p></section>`

const terms = [
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

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" style="max-height: min(32rem, calc(100vh - 4rem))">
        <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${styles.Title}">Terms of Service</ark-dialog-title>
        <ark-dialog-description class="${styles.Description}">Please review our terms before continuing.</ark-dialog-description>
        <div class="${styles.ScrollContainer}">${terms.map((term) => section(term)).join('')}</div>
        <div class="${styles.Actions}">${closeAction({ label: 'Decline' })}${closeAction({ label: 'Accept', solid: true })}</div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
