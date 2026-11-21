import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

const items = [
  { value: '01-introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: '01-getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: '01-installation', depth: 2, label: 'Installation', lines: 8 },
  { value: '01-usage', depth: 2, label: 'Usage', lines: 14 },
  { value: '01-conclusion', depth: 2, label: 'Conclusion', lines: 10 },
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
        <ark-toc-item class="${styles.Item}" value="${item.value}" depth="${item.depth}">
          <ark-toc-link><a class="${styles.Link}" href="#${item.value}">${item.label}</a></ark-toc-link>
        </ark-toc-item>`,
          )
          .join('')}
      </ark-toc-list>
    </ark-toc-nav>
  </ark-toc>`
}
