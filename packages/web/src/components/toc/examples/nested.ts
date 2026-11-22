import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

const items = [
  { value: '02-importance', depth: 2, label: 'Importance', lines: 10 },
  { value: '02-integrations', depth: 2, label: 'Integrations', lines: 12 },
  { value: '02-free-blocks', depth: 3, label: 'Free Blocks', lines: 8 },
  { value: '02-configuration', depth: 3, label: 'Configuration', lines: 14 },
  { value: '02-api-reference', depth: 2, label: 'API Reference', lines: 10 },
  { value: '02-hooks', depth: 3, label: 'Hooks', lines: 8 },
  { value: '02-components', depth: 3, label: 'Components', lines: 12 },
  { value: '02-examples', depth: 2, label: 'Examples', lines: 10 },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root}">
    <ark-toc-content class="${styles.Content}">
      ${items
        .map(
          (item) => /* html */ `
      <section class="${styles.Section}">
        <h2 id="${item.value}" class="${styles.Heading}" data-depth="${item.depth}">${item.label}</h2>
        <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(item.lines)}</div>
      </section>`,
        )
        .join('')}
    </ark-toc-content>
    <ark-toc-nav class="${styles.Nav}">
      <ark-toc-title class="${styles.Title}">On this page</ark-toc-title>
      <ark-toc-list class="${styles.List}">
        ${items
          .map(
            (item) => /* html */ `
        <ark-toc-item class="${item.depth > 2 ? styles.ItemNested : styles.Item}" value="${item.value}" depth="${item.depth}">
          <ark-toc-link><a class="${styles.Link}" href="#${item.value}">${item.label}</a></ark-toc-link>
        </ark-toc-item>`,
          )
          .join('')}
      </ark-toc-list>
    </ark-toc-nav>
  </ark-toc>`
}
