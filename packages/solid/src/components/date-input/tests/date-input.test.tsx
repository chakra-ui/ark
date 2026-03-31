import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'
import { parseDate } from '@internationalized/date'

describe('Date Input', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(() => <ComponentUnderTest />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render label and exactly three spinbutton segments', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Date')).toBeInTheDocument()
    const segments = screen.getAllByRole('spinbutton')
    expect(segments).toHaveLength(3)
  })

  it('should focus segment on click', async () => {
    render(() => <ComponentUnderTest />)
    const [monthSegment] = screen.getAllByRole('spinbutton')
    await user.click(monthSegment)
    expect(monthSegment).toHaveFocus()
  })

  it('should be disabled when disabled prop is passed', () => {
    render(() => <ComponentUnderTest disabled />)
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-disabled')
    })
  })

  it('should be readonly when readOnly prop is passed', () => {
    render(() => <ComponentUnderTest readOnly />)
    screen.getAllByRole('spinbutton').forEach((segment) => {
      expect(segment).toHaveAttribute('data-readonly')
    })
  })

  it('should display defaultValue', () => {
    render(() => <ComponentUnderTest defaultValue={[parseDate('2024-06-15')]} />)
    const [month, day, year] = screen.getAllByRole('spinbutton')
    expect(month).toHaveAttribute('aria-valuenow', '6')
    expect(day).toHaveAttribute('aria-valuenow', '15')
    expect(year).toHaveAttribute('aria-valuenow', '2024')
  })

  it('should mark segments invalid when invalid prop is passed', () => {
    render(() => <ComponentUnderTest invalid />)
    const root = document.querySelector('[data-part="root"]')
    expect(root).toHaveAttribute('data-invalid')
  })

  it('should sync hidden input value when date is entered', async () => {
    render(() => <ComponentUnderTest name="date" defaultValue={[parseDate('2024-06-15')]} />)
    const hiddenInput = document.querySelector('input[type="hidden"]')
    expect(hiddenInput).toHaveValue('6/15/2024')
  })
})
