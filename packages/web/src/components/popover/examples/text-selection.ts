import { createElement, Bold, Italic, Strikethrough, Underline } from 'lucide'

import '@ark-ui/web/popover'

import styles from 'styles/popover.module.css'

const tools = [
  { label: 'Bold', icon: Bold },
  { label: 'Italic', icon: Italic },
  { label: 'Underline', icon: Underline },
  { label: 'Strikethrough', icon: Strikethrough },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover auto-focus="false">
    <p>
      Ark UI is a headless component library for building reusable, scalable design systems. Select any part of this
      text to show a formatting toolbar above it.
    </p>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content} ${styles.Toolbar}">
        <ark-popover-arrow class="${styles.Arrow}"><ark-popover-arrow-tip class="${styles.ArrowTip}"></ark-popover-arrow-tip></ark-popover-arrow>
        ${tools
          .map(
            ({ label, icon }) =>
              /* html */ `<button type="button" class="${styles.ToolbarButton}" aria-label="${label}">${createElement(icon, { 'aria-hidden': 'true' }).outerHTML}</button>`,
          )
          .join('')}
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

  const popover = root.querySelector('ark-popover')!
  const paragraph = root.querySelector('p')!
  const content = root.querySelector('ark-popover-content')!

  popover.positioning = {
    placement: 'top',
    getAnchorElement() {
      const selection = document.getSelection()
      if (!selection?.rangeCount) return null
      const range = selection.getRangeAt(0)
      return {
        contextElement: paragraph,
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      }
    },
  }

  const hasSelection = () => {
    const selection = document.getSelection()
    if (!selection?.rangeCount) return false
    const range = selection.getRangeAt(0)
    return !range.collapsed && paragraph.contains(range.commonAncestorContainer)
  }

  const controller = new AbortController()
  const listen = (type: string, listener: VoidFunction) =>
    document.addEventListener(
      type,
      () => {
        if (!popover.isConnected) return controller.abort()
        listener()
      },
      { signal: controller.signal },
    )

  listen('pointerup', () => {
    if (!hasSelection()) return
    popover.api?.reposition()
    popover.open = true
  })
  listen('selectionchange', () => {
    if (hasSelection()) popover.api?.reposition()
    else popover.open = false
  })
  content.addEventListener('mousedown', (event) => event.preventDefault())
}
