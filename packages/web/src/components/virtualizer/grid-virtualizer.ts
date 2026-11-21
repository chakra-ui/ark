import type { GridVirtualizerOptions, VirtualColumn, VirtualRow } from '@zag-js/virtualizer'

import { createGridVirtualizer, type CreateGridVirtualizerReturn } from './create.js'
import { adoptDisplay, asChild } from '../../utils/define.js'

import { composed, contentOf, defined, number, reuse, templateOf } from './dom.js'
import { renderVirtualItems, spreadVirtualizerProps } from './render.js'

export interface VirtualCell {
  row: number
  column: number
}

const gridAttributes = ['row-count', 'column-count', 'estimated-row-size', 'estimated-column-size', 'overscan', 'gap']

export class GridVirtualizerElement extends HTMLElement {
  static observedAttributes = gridAttributes

  renderCell?: (element: HTMLElement, cell: VirtualCell) => void

  #options: Partial<GridVirtualizerOptions> = {}
  #virtualizer: CreateGridVirtualizerReturn | undefined
  #cleanup: VoidFunction | undefined

  get virtualizer(): CreateGridVirtualizerReturn | undefined {
    return this.#virtualizer
  }

  get options(): Partial<GridVirtualizerOptions> {
    return this.#options
  }

  set options(value: Partial<GridVirtualizerOptions>) {
    this.#options = value
    this.#update()
  }

  #resolve(): GridVirtualizerOptions {
    const rowSize = number(this, 'estimated-row-size') ?? 40
    const columnSize = number(this, 'estimated-column-size') ?? 120

    return {
      observeScrollElementSize: true,
      estimatedRowSize: () => rowSize,
      estimatedColumnSize: () => columnSize,
      ...defined({
        rowCount: number(this, 'row-count') ?? 0,
        columnCount: number(this, 'column-count') ?? 0,
        overscan: number(this, 'overscan'),
        gap: number(this, 'gap'),
      }),
      ...this.#options,
    } as GridVirtualizerOptions
  }

  connectedCallback() {
    adoptDisplay(this, 'block')

    const virtualizer = createGridVirtualizer(this.#resolve())
    const content = contentOf(this, 'ark-grid-virtualizer-content')
    const template = templateOf(content)

    const renderRow = (row: VirtualRow, element?: HTMLElement) => {
      const next = element ?? document.createElement('ark-grid-virtualizer-row')

      const renderCell = (column: VirtualColumn, cell?: HTMLElement) => {
        const nextCell = reuse(cell, template, 'ark-grid-virtualizer-cell', `${row.row}:${column.column}`)
        const target = asChild(nextCell.element) ?? nextCell.element
        if (nextCell.fresh) this.renderCell?.(target, { row: row.row, column: column.column })

        spreadVirtualizerProps(target, {
          ...(target === nextCell.element ? virtualizer.getCellAriaAttrs(row.row, column.column) : {}),
          style: virtualizer.getCellStyleInRow(column),
        })

        return nextCell.element
      }

      spreadVirtualizerProps(next, {
        ...virtualizer.getRowAriaAttrs(row.row),
        style: virtualizer.getRowStyle(row),
      })
      renderVirtualItems(next, row.columns, (column) => column.column, renderCell)

      return next
    }

    const render = () => {
      spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })
      renderVirtualItems(content, virtualizer.getVirtualRows(), (row) => row.row, renderRow)
    }

    spreadVirtualizerProps(this, {
      ...(composed(this) ? {} : virtualizer.getContainerAriaAttrs()),
      style: virtualizer.getContainerStyle(),
    })

    this.#virtualizer = virtualizer
    const unsubscribe = virtualizer.subscribe(render)
    const detach = virtualizer.attach(this)
    render()

    this.#cleanup = () => {
      unsubscribe?.()
      detach()
    }
  }

  disconnectedCallback() {
    this.#cleanup?.()
    this.#cleanup = undefined
    this.#virtualizer = undefined
  }

  attributeChangedCallback() {
    this.#update()
  }

  #update() {
    this.#virtualizer?.updateOptions(this.#resolve())
  }
}
