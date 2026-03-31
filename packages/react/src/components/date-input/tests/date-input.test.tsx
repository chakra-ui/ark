import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'
import { parseDate } from '@internationalized/date'
import { DateInput } from '..'

describe('Date Input', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render label and exactly three spinbutton segments', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('Date')).toBeInTheDocument()
    const segments = screen.getAllByRole('spinbutton')
    expect(segments).toHaveLength(3)
  })

  it('should render all date segments', () => {
    render(<ComponentUnderTest />)
    const segments = screen.getAllByRole('spinbutton')
    expect(segments).toHaveLength(3) // month, day, year
  })

  it('should focus segment on click', async () => {
    render(<ComponentUnderTest />)
    const [monthSegment] = screen.getAllByRole('spinbutton')
    await user.click(monthSegment)
    expect(monthSegment).toHaveFocus()
  })

  it('should update month segment on typing', async () => {
    render(<ComponentUnderTest />)
    const [monthSegment] = screen.getAllByRole('spinbutton')
    await user.click(monthSegment)
    await user.keyboard('06')
    expect(monthSegment).toHaveTextContent('6')
  })

  it('should clear value on Backspace', async () => {
    render(<ComponentUnderTest defaultValue={[parseDate('2024-06-15')]} />)
    const [monthSegment] = screen.getAllByRole('spinbutton')
    await user.click(monthSegment)
    await user.keyboard('{Backspace}')
    expect(monthSegment).not.toHaveAttribute('aria-valuenow')
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<ComponentUnderTest disabled />)
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-disabled')
    })
  })

  it('should be readonly when readOnly prop is passed', () => {
    render(<ComponentUnderTest readOnly />)
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-readonly')
    })
  })

  it('should display defaultValue', () => {
    render(<ComponentUnderTest defaultValue={[parseDate('2024-06-15')]} />)
    const [month, day, year] = screen.getAllByRole('spinbutton')
    expect(month).toHaveAttribute('aria-valuenow', '6')
    expect(day).toHaveAttribute('aria-valuenow', '15')
    expect(year).toHaveAttribute('aria-valuenow', '2024')
  })

  it('should mark segments invalid when invalid prop is passed', () => {
    render(<ComponentUnderTest invalid />)
    const root = document.querySelector('[data-part="root"]')
    expect(root).toHaveAttribute('data-invalid')
  })

  it('should sync hidden input value when date is entered', async () => {
    render(<ComponentUnderTest name="date" defaultValue={[parseDate('2024-06-15')]} />)
    const hiddenInput = document.querySelector('input[type="hidden"]')
    expect(hiddenInput).toHaveValue('6/15/2024')
  })

  it('should sync hidden input values for range selection by index', () => {
    render(
      <DateInput.Root
        name="date"
        selectionMode="range"
        defaultValue={[parseDate('2024-06-15'), parseDate('2024-06-20')]}
      >
        <DateInput.HiddenInput index={0} />
        <DateInput.HiddenInput index={1} />
      </DateInput.Root>,
    )

    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]')
    expect(hiddenInputs).toHaveLength(2)
    expect(hiddenInputs[0]).toHaveValue('6/15/2024')
    expect(hiddenInputs[1]).toHaveValue('6/20/2024')
  })
})
