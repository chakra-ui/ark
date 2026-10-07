import { act, render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'

describe('Meter', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest defaultValue={24} />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should expose the value to assistive technology', () => {
    render(<ComponentUnderTest defaultValue={24} />)

    const meter = screen.getByRole('meter', { name: 'Storage used' })
    expect(meter).toHaveAttribute('aria-valuenow', '24')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '100')
    expect(meter).toHaveAttribute('aria-valuetext', '24%')
    screen.getByText('24%')
  })

  it('should format the value with formatOptions', () => {
    render(
      <ComponentUnderTest
        defaultValue={1240}
        max={2000}
        locale="en-US"
        formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      />,
    )

    screen.getByText('$1,240')
  })

  it('should use custom value text from translations', () => {
    render(
      <ComponentUnderTest
        defaultValue={3}
        max={5}
        translations={{ value: ({ value, max }) => `${value} of ${max}` }}
      />,
    )

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '3 of 5')
    screen.getByText('3 of 5')
  })

  it('should size the indicator by percent', () => {
    const { container } = render(<ComponentUnderTest defaultValue={30} min={-10} max={40} />)

    expect(container.querySelector('[data-meter-indicator]')).toHaveStyle({ width: '80%' })
  })

  it.each([
    [32, 'optimal'],
    [68, 'suboptimal'],
    [91, 'least-optimal'],
  ])('should mark %i as %s when lower is better', (value, state) => {
    render(<ComponentUnderTest defaultValue={value} low={50} high={80} optimum={0} />)

    expect(screen.getByRole('meter')).toHaveAttribute('data-state', state)
  })
})
