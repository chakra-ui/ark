import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './date-picker.test.vue'
import MonthPicker from '../examples/month-picker.vue'
import YearPicker from '../examples/year-picker.vue'

describe('Date Picker', () => {
  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
        unmountOnExit: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should select the typed date on blur by default', async () => {
    const { emitted } = render(ComponentUnderTest)

    await user.type(screen.getByRole('textbox'), '01/15/2024')
    await user.tab()

    await waitFor(() => expect(emitted('valueChange')).toBeDefined())
  })
})

describe('Date Picker / table cells', () => {
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
