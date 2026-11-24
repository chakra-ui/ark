import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/collapsible'
import '@ark-ui/web/toc'

import collapsible from 'styles/collapsible.module.css'
import styles from 'styles/toc.module.css'

interface Item {
  value: string
  depth: number
  label: string
  lines: number
}

const items: Item[] = [
  { value: '04-overview', depth: 2, label: 'Overview', lines: 8 },
  { value: '04-prerequisites', depth: 2, label: 'Prerequisites', lines: 5 },
  { value: '04-quick-start', depth: 2, label: 'Quick Start', lines: 20 },
  { value: '04-commands', depth: 2, label: 'Core Commands', lines: 15 },
  { value: '04-troubleshooting', depth: 2, label: 'Troubleshooting', lines: 12 },
]

const section = (item: Item, tag = 'h2') => /* html */ `
  <section>
    <${tag} id="${item.value}" class="${styles.Heading}" data-depth="${item.depth}">${item.label}</${tag}>
    <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(item.lines)}</div>
  </section>`

const ring = /* html */ `
  <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true" class="${styles.ProgressRing}">
    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="2.5" />
    <circle data-progress cx="18" cy="18" r="14" fill="none" pathLength="100" stroke="var(--demo-coral-solid)" stroke-width="2.5"
      stroke-dasharray="0 100" stroke-linecap="round" transform="rotate(-90 18 18)" style="transition: stroke-dasharray 0.4s ease-out" />
    <text data-index x="18" y="18" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="600" fill="currentColor"
      class="${styles.ProgressIndexText}">—</text>
  </svg>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root}" data-stacked>
    <ark-collapsible class="${collapsible.Root}" style="width: 100%">
      <ark-collapsible-trigger>
        <button class="${collapsible.Trigger}">
          <span class="${styles.TriggerContent}">${ring}<span class="${styles.TriggerLabel}" data-label>On this page</span></span>
          <ark-collapsible-indicator class="${collapsible.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
        </button>
      </ark-collapsible-trigger>
      <ark-collapsible-content class="${collapsible.Content}">
        <ark-toc-list class="${styles.List}">
          ${items
            .map(
              (item, index) => /* html */ `
          <ark-toc-item class="${styles.Item}" value="${item.value}" depth="${item.depth}">
            <ark-toc-link><a class="${styles.LinkNumbered}" href="#${item.value}"><span class="${styles.Number}">${String(index + 1).padStart(2, '0')}</span>${item.label}</a></ark-toc-link>
          </ark-toc-item>`,
            )
            .join('')}
        </ark-toc-list>
      </ark-collapsible-content>
    </ark-collapsible>
    <ark-toc-content class="${styles.Content}">${items.map((item) => section(item)).join('')}</ark-toc-content>
  </ark-toc>`

  const toc = root.querySelector('ark-toc')!
  const label = root.querySelector<HTMLElement>('[data-label]')!
  const progress = root.querySelector('[data-progress]')!
  const index = root.querySelector('[data-index]')!
  toc.addEventListener('activechange', (event) => {
    const active = items.findIndex((item) => item.value === event.detail.activeIds[0])
    label.textContent = items[active]?.label ?? 'On this page'
    progress.setAttribute('stroke-dasharray', `${active >= 0 ? ((active + 1) / items.length) * 100 : 0} 100`)
    index.textContent = active >= 0 ? String(active + 1) : '—'
  })
}
