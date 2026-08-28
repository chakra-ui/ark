import { render, screen } from '@solidjs/testing-library'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'

describe('Progress', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(() => <ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should handle value', async () => {
    render(() => <ComponentUnderTest value={42} />)

    screen.getByText('42%')
  })

  it('should handle custom max range', async () => {
    render(() => <ComponentUnderTest value={30} max={30} />)

    screen.getByText('100%')
  })
})
