import '@ark-ui/web/swap'
import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

interface Item {
  value: string
  depth: number
  label: string
  lines: number
}

const items: Item[] = [
  { value: '05-analytics-dashboard', depth: 2, label: 'Real-time Analytics', lines: 55 },
  { value: '05-cloud-storage', depth: 2, label: 'S3 Cloud Storage', lines: 14 },
  { value: '05-automation-tools', depth: 2, label: 'Workflow Automation', lines: 32 },
  { value: '05-crm-integration', depth: 2, label: 'Salesforce Sync', lines: 45 },
  { value: '05-report-generator', depth: 2, label: 'Custom PDF Reports', lines: 20 },
]

const section = (item: Item, tag = 'h2') => /* html */ `
  <section>
    <${tag} id="${item.value}" class="${styles.Heading}" data-depth="${item.depth}">${item.label}</${tag}>
    <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(item.lines)}</div>
  </section>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root} ${styles.HoverRoot}">
    <ark-toc-content class="${styles.Content}">${items.map((item) => section(item)).join('')}</ark-toc-content>
    <ark-toc-nav class="${styles.NavHover}">
      <ark-swap class="${styles.HoverSwap}">
        <ark-swap-indicator type="off" class="${styles.HoverSkeleton}">
          ${items.map((item) => `<ark-toc-item class="${styles.SkeletonBar}" value="${item.value}" depth="${item.depth}"></ark-toc-item>`).join('')}
        </ark-swap-indicator>
        <ark-swap-indicator type="on" class="${styles.HoverList}">
          ${items
            .map(
              (item) => /* html */ `
          <ark-toc-item class="${styles.Item}" value="${item.value}" depth="${item.depth}">
            <ark-toc-link><a class="${styles.HoverLink}" href="#${item.value}">${item.label}</a></ark-toc-link>
          </ark-toc-item>`,
            )
            .join('')}
        </ark-swap-indicator>
      </ark-swap>
    </ark-toc-nav>
  </ark-toc>`

  const toc = root.querySelector('ark-toc')!
  toc.items = items
  const nav = root.querySelector<HTMLElement>('ark-toc-nav')!
  const swap = root.querySelector('ark-swap')!
  const hover = (on: boolean) => {
    nav.toggleAttribute('data-expanded', on)
    swap.toggleAttribute('swap', on)
  }
  nav.addEventListener('mouseenter', () => hover(true))
  nav.addEventListener('mouseleave', () => hover(false))
}
