import {
  createGridVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualColumn,
  type VirtualRow,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/virtualizer.module.css'

const rowKey = (row: VirtualRow) => row.row

const columnKey = (column: VirtualColumn) => column.column

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Grid}" data-testid="grid">
    <div></div>
  </div>`

  const scroller = root.querySelector<HTMLElement>('[data-testid="grid"]')!
  const content = scroller.querySelector('div')!

  const virtualizer = createGridVirtualizer({
    rowCount: 1000,
    columnCount: 50,
    estimatedRowSize: () => 40,
    estimatedColumnSize: () => 120,
    observeScrollElementSize: true,
  })

  const renderRow = (row: VirtualRow, element?: HTMLElement) => {
    const next = element ?? document.createElement('div')

    const renderCell = (column: VirtualColumn, cell?: HTMLElement) => {
      const nextCell = cell ?? document.createElement('div')
      nextCell.className = styles.Cell
      nextCell.textContent = `R${row.row + 1}C${column.column + 1}`
      spreadVirtualizerProps(nextCell, {
        ...virtualizer.getCellAriaAttrs(row.row, column.column),
        style: virtualizer.getCellStyleInRow(column),
      })
      return nextCell
    }

    spreadVirtualizerProps(next, {
      ...virtualizer.getRowAriaAttrs(row.row),
      style: virtualizer.getRowStyle(row),
    })
    renderVirtualItems(next, row.columns, columnKey, renderCell)
    return next
  }

  const render = () => {
    spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })
    renderVirtualItems(content, virtualizer.getVirtualRows(), rowKey, renderRow)
  }

  spreadVirtualizerProps(scroller, {
    ...virtualizer.getContainerAriaAttrs(),
    style: virtualizer.getContainerStyle(),
  })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  render()
}
