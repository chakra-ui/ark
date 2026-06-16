import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useCallback, useReducer } from 'react'
import { ark } from './factory.ts'

const ComponentUnderTest = () => (
  <ark.div id="parent" data-part="parent" data-testid="parent" className="parent" style={{ background: 'red' }} asChild>
    <ark.span id="child" data-part="child" data-testid="child" className="child" style={{ color: 'blue' }}>
      Ark UI
    </ark.span>
  </ark.div>
)

describe('Ark Factory', () => {
  it('should render only the child', () => {
    render(<ComponentUnderTest />)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(<ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    // biome-ignore lint/complexity/useLiteralKeys: intentional
    expect(child.dataset['part']).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(<ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'blue' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Ark UI')).toBeVisible()
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(
      <ark.div data-testid="parent" onClick={onClickParent} asChild>
        <ark.span data-testid="child" onClick={onClickChild} />
      </ark.div>,
    )
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(
      <ark.div data-testid="parent" asChild>
        <ark.span asChild>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>,
    )
    expect(screen.getByText('Ark UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(
      <ark.div data-testid="parent" asChild>
        <ark.span asChild={false}>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>,
    )
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  it('should not detach stable asChild callback ref on parent re-render', async () => {
    const callbackRef = vi.fn()

    const AsChildTest = () => {
      const [, rerender] = useReducer((count) => count + 1, 0)
      const setRef = useCallback((node: HTMLSpanElement | null) => {
        callbackRef(node)
      }, [])

      return (
        <>
          <ark.span ref={setRef} asChild>
            <span data-testid="child">Ark UI</span>
          </ark.span>
          <button type="button" onClick={() => rerender()}>
            re-render
          </button>
        </>
      )
    }

    render(<AsChildTest />)
    expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId('child'))

    const callsAfterMount = callbackRef.mock.calls.length
    await user.click(screen.getByRole('button', { name: /re-render/i }))

    expect(callbackRef).toHaveBeenCalledTimes(callsAfterMount)
  })
})
