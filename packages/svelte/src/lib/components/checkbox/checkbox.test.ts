import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Checkbox', async () => {
  it('should render', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Checkbox')).toBeInTheDocument()
  })
})
