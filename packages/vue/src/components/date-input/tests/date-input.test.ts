import { parseDate } from '@internationalized/date'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { DateInput } from '..'
import ComponentUnderTest from './date-input.test.vue'

describe('Date Input', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render label and exactly three spinbutton segments', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Date')).toBeInTheDocument()
    const segments = screen.getAllByRole('spinbutton')
    expect(segments).toHaveLength(3)
  })

  it('should be disabled when disabled prop is passed', () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-disabled')
    })
  })

  it('should be readonly when readOnly prop is passed', () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-readonly')
    })
  })

  it('should display defaultValue', () => {
    render(ComponentUnderTest, { props: { defaultValue: [parseDate('2024-06-15')] } })
    const [month, day, year] = screen.getAllByRole('spinbutton')
    expect(month).toHaveAttribute('aria-valuenow', '6')
    expect(day).toHaveAttribute('aria-valuenow', '15')
    expect(year).toHaveAttribute('aria-valuenow', '2024')
  })

  it('should mark segments invalid when invalid prop is passed', () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    const root = document.querySelector('[data-part="root"]')
    expect(root).toHaveAttribute('data-invalid')
  })

  it('should sync hidden input value when date is entered', async () => {
    render(ComponentUnderTest, { props: { name: 'date', defaultValue: [parseDate('2024-06-15')] } })
    const hiddenInput = document.querySelector('input[type="hidden"]')
    expect(hiddenInput).toHaveValue('6/15/2024')
  })

  it('should sync hidden input values for range selection by index', () => {
    render(
      {
        components: { DateInput },
        setup() {
          return {
            defaultValue: [parseDate('2024-06-15'), parseDate('2024-06-20')],
          }
        },
        template: `
          <DateInput.Root name="date" selectionMode="range" :defaultValue="defaultValue">
            <DateInput.HiddenInput :index="0" />
            <DateInput.HiddenInput :index="1" />
          </DateInput.Root>
        `,
      },
      {},
    )

    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]')
    expect(hiddenInputs).toHaveLength(2)
    expect(hiddenInputs[0]).toHaveValue('6/15/2024')
    expect(hiddenInputs[1]).toHaveValue('6/20/2024')
  })
})
