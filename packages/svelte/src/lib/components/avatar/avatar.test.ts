import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'
import ContextComponent from './examples/context.svelte'
import DeprecatedApiComponent from './tests/context-deprecated-api.test.svelte'

describe('Avatar', async () => {
  it("should render the user's initials", async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('PA')).toBeInTheDocument()
  })

  it('should render the context through the render snippet', async () => {
    render(ContextComponent)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('should still render the context through the deprecated api snippet', async () => {
    render(DeprecatedApiComponent)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })
})
