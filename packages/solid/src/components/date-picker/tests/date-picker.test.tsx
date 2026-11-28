import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic.tsx'
import { MonthPicker } from '../examples/month-picker.tsx'
import { YearPicker } from '../examples/year-picker.tsx'

describe('Date Picker', () => {
  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should be fully controlled (true)', async () => {
    render(() => <ComponentUnderTest open={true} />)

    const closeButton = screen.getByRole('button', { name: 'Close calendar' })

    expect(closeButton).toBeVisible()

    await user.click(closeButton)
    expect(closeButton).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(() => <ComponentUnderTest open={false} />)

    const closeButton = screen.queryByRole('button', { name: 'Close calendar' })
    expect(closeButton).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(closeButton).not.toBeInTheDocument()
  })
})

describe('Date Picker / table cells', () => {
  const inView = (view: string, selector: string) => [...document.querySelectorAll(`[data-view="${view}"] ${selector}`)]
  const cells = (view: string) => inView(view, 'td[data-date-picker-table-cell]')
  const triggers = (view: string) => inView(view, '[data-date-picker-table-cell-trigger]')

  it('should give month cells and triggers their props', async () => {
    render(() => <MonthPicker />)

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
    render(() => <YearPicker />)

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
