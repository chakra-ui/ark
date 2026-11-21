import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const popoverMarkup = (attrs: string, body: string) => `
  <ark-popover ${attrs}>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${body}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const heading = (title: string, description: string) => `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popoverMarkup(
    '',
    `${heading('Settings', 'Manage your preferences and account settings.')}
     <ark-popover placement="right" unmount-on-exit>
       <ark-popover-trigger><button class="${button.Root}">Advanced</button></ark-popover-trigger>
       <ark-popover-positioner class="${styles.Positioner}">
         <ark-popover-content class="${styles.Content}">
           <template>${heading('Advanced Settings', 'Configure advanced options for power users.')}</template>
         </ark-popover-content>
       </ark-popover-positioner>
     </ark-popover>`,
  )
}
