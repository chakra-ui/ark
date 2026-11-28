import { render, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Inline from '../examples/inline.svelte'
import MonthPicker from '../examples/month-picker.svelte'
import YearPicker from '../examples/year-picker.svelte'

const dayCells = () => [...document.querySelectorAll<HTMLTableCellElement>('td')]

describe('Date Picker / table cells', () => {
  it('should give each day cell its cell props', () => {
    render(Inline)
    const cells = dayCells()

    expect(cells.length).toBeGreaterThan(27)
    for (const cell of cells) {
      expect(cell).toHaveAttribute('role', 'gridcell')
      expect(cell).toHaveAttribute('data-date-picker-table-cell')
    }
  })

  it('should give each day trigger its trigger props', () => {
    render(Inline)
    const triggers = [...document.querySelectorAll('[data-date-picker-table-cell-trigger]')]

    expect(triggers.length).toBeGreaterThan(27)
    expect(triggers[0]).toHaveAttribute('data-value')
  })

  const inView = (view: string, selector: string) => [...document.querySelectorAll(`[data-view="${view}"] ${selector}`)]
  const cells = (view: string) => inView(view, 'td[data-date-picker-table-cell]')
  const triggers = (view: string) => inView(view, '[data-date-picker-table-cell-trigger]')

  it('should give month cells and triggers their props', async () => {
    render(MonthPicker)

    await waitFor(() => expect(triggers('month')).toHaveLength(12))
    expect(cells('month')).toHaveLength(12)
    for (const cell of cells('month')) expect(cell).toHaveAttribute('role', 'gridcell')
    expect(triggers('month').map((trigger) => trigger.getAttribute('data-value'))).toEqual(
      Array.from({ length: 12 }, (_, index) => String(index + 1)),
    )
    for (const trigger of triggers('month')) expect(trigger).toHaveAttribute('data-view', 'month')
    expect(triggers('month')[0]).toHaveAttribute('aria-label', expect.stringMatching(/^January \d{4}$/))
  })

  it('should give year cells and triggers their props', async () => {
    render(YearPicker)

    await waitFor(() => expect(triggers('year').length).toBeGreaterThan(9))
    expect(cells('year')).toHaveLength(triggers('year').length)
    for (const cell of cells('year')) expect(cell).toHaveAttribute('role', 'gridcell')
    for (const trigger of triggers('year')) {
      expect(trigger).toHaveAttribute('data-view', 'year')
      expect(trigger.getAttribute('data-value')).toMatch(/^\d{4}$/)
      expect(trigger).toHaveAttribute('aria-label', trigger.getAttribute('data-value'))
    }
  })
})
