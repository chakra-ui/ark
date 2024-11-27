import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Avatar', async () => {
  it("should render the user's initials", async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('PA')).toBeInTheDocument()
  })
})
