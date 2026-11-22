import '@ark-ui/web/splitter'

import styles from 'styles/splitter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-splitter class="${styles.Root}" default-size="15, 85"><ark-splitter-panel class="${styles.Panel}" value="a" collapsed-size="5" min-size="20" max-size="40">A</ark-splitter-panel>
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="a:b" aria-label="Resize panels">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger><ark-splitter-panel class="${styles.Panel}" value="b" >B</ark-splitter-panel></ark-splitter>`
  const splitterEl = root.querySelector('ark-splitter')!
  const panelA = splitterEl.querySelector('ark-splitter-panel')!
  let belowMd: boolean | undefined
  const observer = new ResizeObserver(() => {
    if (!splitterEl.isConnected) return observer.disconnect()
    const next = splitterEl.offsetWidth < 600
    if (next === belowMd) return
    belowMd = next
    panelA.toggleAttribute('collapsible', next)
    // Re-read panels now; the mutation observer would only catch up after the collapse below
    splitterEl.refresh()
    if (next) splitterEl.api?.collapsePanel('a')
    else splitterEl.api?.expandPanel('a')
  })
  observer.observe(splitterEl)
  root.replaceChildren(splitterEl)
}
