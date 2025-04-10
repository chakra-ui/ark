import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('QR-Code', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
