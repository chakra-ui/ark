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
    style="background: red"
    asChild
  >
    <ark.span
      id="child"
      data-part="child"
      data-testid="child"
      class="child"
      style="color: blue"
    ></ark.span>
  </ark.div>
)

describe('spread', () => {
  it('should render only the child', () => {
    render(ComponentUnderTest)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
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

  it('should merge styles and classes', () => {
    render(ComponentUnderTest)

    const child = screen.getByTestId('child')
    expect(child.style.background).toBe('red')
    expect(child.style.color).toBe('blue')
    expect(child).toHaveClass('child parent')
  })

  it('should not override existing props', () => {
    render(ComponentUnderTest)

    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    expect(child.dataset.part).toBe('child')
  })
})
