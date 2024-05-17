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
    asChild={(props) => (
      <ark.span
        {...props({ id: 'child', class: 'child', style: { color: 'blue' } })}
        data-part="child"
        data-testid="child"
      >
        Child
      </ark.span>
    )}
  >
    Parent
  </ark.div>
)

describe('Ark Factory', () => {
  it('should render only the child', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toBeVisible()
  })

  it('should merge styles', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toHaveStyle({ color: 'rgb(0, 0, 255)', background: 'red' })
  })

  it('should merge classes', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toHaveClass('child parent')
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(() => (
      <ark.div
        data-testid="parent"
        onClick={onClickParent}
        asChild={(props) => <ark.span {...props({ onClick: onClickChild })} data-testid="child" />}
      >
        Parent
      </ark.div>
    ))
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <ark.div
        data-testid="parent"
        asChild={(props) => (
          <ark.span {...props()}>
            <ark.span>Child</ark.span>
          </ark.span>
        )}
      >
        Parent
      </ark.div>
    ))
    expect(screen.getByText('Child')).not.toHaveAttribute('data-testid', 'parent')
  })
})
