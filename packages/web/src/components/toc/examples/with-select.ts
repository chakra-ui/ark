import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

interface Item {
  value: string
  depth: number
  label: string
  lines: number
}

const items: Item[] = [
  { value: '08-introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: '08-getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: '08-installation', depth: 2, label: 'Installation', lines: 8 },
  { value: '08-usage', depth: 2, label: 'Usage', lines: 14 },
  { value: '08-conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

const section = (item: Item, tag = 'h2') => /* html */ `
  <section>
    <${tag} id="${item.value}" class="${styles.Heading}" data-depth="${item.depth}">${item.label}</${tag}>
    <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(item.lines)}</div>
  </section>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root} ${styles.RootWithMobileNav}">
    <div class="${styles.MobileNav}">
      <select class="${styles.NativeSelect}" aria-label="On this page">
        ${items.map((item) => `<option value="${item.value}">${item.label}</option>`).join('')}
      </select>
    </div>
    <ark-toc-content class="${styles.Content}">${items.map((item) => section(item)).join('')}</ark-toc-content>
    <ark-toc-nav class="${styles.Nav}">
      <ark-toc-title class="${styles.Title}">On this page</ark-toc-title>
      <ark-toc-list class="${styles.List}">
        ${items
          .map(
            (item) => /* html */ `
        <ark-toc-item class="${styles.Item}" value="${item.value}" depth="${item.depth}">
          <ark-toc-link><a class="${styles.Link}" href="#${item.value}">${item.label}</a></ark-toc-link>
        </ark-toc-item>`,
          )
          .join('')}
      </ark-toc-list>
    </ark-toc-nav>
  </ark-toc>`

  const toc = root.querySelector('ark-toc')!
  const select = root.querySelector('select')!
  select.addEventListener('change', () => toc.api?.scrollTo(select.value))
  toc.addEventListener('activechange', (event) => {
    const [active] = event.detail.activeIds
    select.toggleAttribute('data-active', !!active)
    if (active) select.value = active
  })
}
