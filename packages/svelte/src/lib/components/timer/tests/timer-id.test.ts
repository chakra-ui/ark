import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './timer-id.test.svelte'

describe('Timer / id', () => {
  it('should derive the part ids from a caller-supplied id', () => {
    const { container } = render(ComponentUnderTest)
    expect(container.querySelector('[data-part="root"]')).toHaveAttribute('id', 'timer:custom:root')
  })
})
