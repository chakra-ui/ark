import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('Avatar', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render the initials if no src is provided', async () => {
    render(<ComponentUnderTest />)
    await screen.findByText('PA')
  })
})
