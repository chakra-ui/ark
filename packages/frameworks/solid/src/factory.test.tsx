import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { ark } from './factory'

const ComponentUnderTest = () => (
  <ark.div
    id="parent"
    data-part="parent"
    data-testid="parent"
    class="parent"
    style={{ background: 'red' }}
    asChild
  >
    <ark.span
      id="child"
      data-part="child"
      data-testid="child"
      class="child"
      style={{ color: 'blue' }}
    >
      Ark UI
    </ark.span>
  </ark.div>
)

describe('Ark Factory', () => {
  it('should render only the child', () => {
    render(() => <ComponentUnderTest />)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(() => <ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    expect(child.dataset.part).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(() => <ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'rgb(0, 0, 255)' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Ark UI')).toBeVisible()
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(() => (
      <ark.div data-testid="parent" onClick={onClickParent} asChild>
        <ark.span data-testid="child" onClick={onClickChild} />
      </ark.div>
    ))
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <ark.span asChild>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <ark.span asChild={false}>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <ark.span asChild={false}>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  // TODO it should be possible to spread classes and styles to svgs
  it.skip('should merge styles and classes for svgs', async () => {
    render(() => (
      <ark.div data-testid="parent" class="parent" asChild>
        <svg viewBox="0 0 0 24" fill="none" data-testid="child" class="child">
          <path d="M0 0h24v24H0z" />
        </svg>
      </ark.div>
    ))
    const child = screen.getByTestId('child')
    expect(child).toHaveClass('child parent')
  })
})
