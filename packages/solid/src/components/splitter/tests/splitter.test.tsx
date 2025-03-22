import { render } from '@solidjs/testing-library'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('Splitter', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(() => <ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
