import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const actions = [
  { id: 'share', label: 'Share', detail: 'Share this item with others via link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive for later reference.' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-popover>
      <div class="${button.Group}">
        <ark-popover-trigger value="share"><button class="${button.Root}">Share</button></ark-popover-trigger><ark-popover-trigger value="export"><button class="${button.Root}">Export</button></ark-popover-trigger><ark-popover-trigger value="archive"><button class="${button.Root}">Archive</button></ark-popover-trigger>
      </div>
      <ark-popover-positioner class="${styles.Positioner}">
        <ark-popover-content class="${styles.Content}">
  <ark-popover-title class="${styles.Title}">Select an action</ark-popover-title>
  <ark-popover-description class="${styles.Description}">Click a button above</ark-popover-description></ark-popover-content>
      </ark-popover-positioner>
    </ark-popover>`
  root.querySelector('ark-popover')!.addEventListener('triggervaluechange', (event) => {
    const action = actions.find((action) => action.id === event.detail.value)
    root.querySelector('ark-popover-title')!.textContent = action?.label ?? 'Select an action'
    root.querySelector('ark-popover-description')!.textContent = action?.detail ?? 'Click a button above'
  })
}
