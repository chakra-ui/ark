import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

const items = [
  { value: '06-step-validation', depth: 2, label: 'Validation Pending', lines: 5 },
  { value: '06-upload-progress', depth: 2, label: 'Asset Uploading', lines: 90 },
  { value: '06-deployment-sync', depth: 2, label: 'Server Sync Active', lines: 12 },
  { value: '06-build-pipeline', depth: 2, label: 'CI/CD Running', lines: 105 },
  { value: '06-database-health', depth: 2, label: 'DB Connection Stable', lines: 3 },
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
        <ark-toc-indicator class="${styles.Indicator}"></ark-toc-indicator>
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
