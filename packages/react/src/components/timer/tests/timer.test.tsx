import { act, render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'

describe('Timer / Parts & Exports', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
