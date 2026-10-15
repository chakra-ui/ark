import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './tooltip-id.test.svelte'

describe('Tooltip / id', () => {
  it('should derive the part ids from a caller-supplied id', () => {
    const { container } = render(ComponentUnderTest)
    expect(container.querySelector('[data-part="trigger"]')).toHaveAttribute('id', 'tooltip:custom:trigger')
  })
})
