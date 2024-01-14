import { fireEvent, render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { createSignal } from 'solid-js'
import { vi } from 'vitest'
import { ark } from './factory'
import { As } from './polymorphic'

const ComponentUnderTest = () => (
  <ark.div
    id="parent"
    data-part="parent"
    data-testid="parent"
    class="parent"
    style={{ background: 'red' }}
    asChild
  >
    <As
      component={ark.span}
      id="child"
      data-part="child"
      data-testid="child"
      class="child"
      style={{ color: 'blue' }}
    >
      Ark UI
    </As>
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
        <As component={ark.span} data-testid="child" onClick={onClickChild} />
      </ark.div>
    ))
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <As component={ark.span} asChild>
          <As component={ark.span}>Ark UI</As>
        </As>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <As component={ark.span} asChild={false}>
          <ark.span>Ark UI</ark.span>
        </As>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <ark.div data-testid="parent" asChild>
        <As component={ark.span} asChild={false}>
          <ark.span>Ark UI</ark.span>
        </As>
      </ark.div>
    ))
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  it('should merge classes for svgs', async () => {
    render(() => (
      <ark.div data-testid="parent" class="parent" asChild>
        <As component="svg" viewBox="0 0 0 24" fill="none" data-testid="child" class="child">
          <path d="M0 0h24v24H0z" />
        </As>
      </ark.div>
    ))
    const child = screen.getByTestId('child')
    expect(child).toHaveClass('child parent')
  })

  it('should merge props after updates', async () => {
    render(() => {
      const [parentCount, setParentCount] = createSignal(0)
      const [childCount, setChildCount] = createSignal(0)

      const parentClass = () => `parent parent-count-${parentCount()}`
      const childClass = () => `child child-count-${childCount()}`

      return (
        <ark.div
          data-testid="parent"
          class={parentClass()}
          onClick={() => {
            setParentCount((c) => c + 1)
          }}
          asChild
        >
          <As
            component="svg"
            viewBox="0 0 0 24"
            fill="none"
            data-testid="child"
            class={childClass()}
            onClick={() => {
              setChildCount((c) => c + 1)
            }}
          >
            <path d="M0 0h24v24H0z" />
          </As>
        </ark.div>
      )
    })

    const child = screen.getByTestId('child')
    expect(child).toHaveClass('parent parent-count-0 child child-count-0')

    fireEvent.click(child)

    expect(child).toHaveClass('parent parent-count-1 child child-count-1')

    fireEvent.click(child)

    expect(child).toHaveClass('parent parent-count-2 child child-count-2')
  })
})
