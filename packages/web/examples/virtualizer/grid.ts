import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-grid-virtualizer
      class="${styles.Grid}"
      data-testid="grid"
      row-count="1000"
      column-count="50"
      estimated-row-size="40"
      estimated-column-size="120"
    >
      <ark-grid-virtualizer-content>
        <template><ark-grid-virtualizer-cell class="${styles.Cell}"></ark-grid-virtualizer-cell></template>
      </ark-grid-virtualizer-content>
    </ark-grid-virtualizer>`

  root.querySelector('ark-grid-virtualizer')!.renderCell = (element, { row, column }) => {
    element.textContent = `R${row + 1}C${column + 1}`
  }
}
