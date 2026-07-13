import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { forwardRef, useCallback, useReducer } from 'react'
import { ark } from './factory.ts'

const MyButton = forwardRef<HTMLButtonElement, { children?: React.ReactNode }>((props, ref) => (
  <button type="button" ref={ref} {...props} data-testid="child" />
))

describe('Ark Factory', () => {
  describe('render as element', () => {
    it('should render only the custom element', () => {
      render(<ark.button data-testid="parent" render={<MyButton>Ark UI</MyButton>} />)

      expect(() => screen.getByTestId('parent')).toThrow()
      expect(screen.getByTestId('child')).toBeVisible()
    })

    it('should merge props, styles and classes', () => {
      render(
        <ark.div
          id="parent"
          className="parent"
          style={{ background: 'red' }}
          render={<span id="child" className="child" style={{ color: 'blue' }} data-testid="child" />}
        />,
      )

      const child = screen.getByTestId('child')
      expect(child.id).toBe('child')
      expect(child).toHaveStyle({ background: 'red' })
      expect(child).toHaveStyle({ color: 'blue' })
      expect(child).toHaveClass('child parent')
    })

    it('should merge events', async () => {
      const onClickParent = vi.fn()
      const onClickChild = vi.fn()

      render(
        <ark.button
          onClick={onClickParent}
          render={<button type="button" data-testid="child" onClick={onClickChild} />}
        />,
      )

      await user.click(screen.getByTestId('child'))
      expect(onClickParent).toHaveBeenCalled()
      expect(onClickChild).toHaveBeenCalled()
    })

    it('should pass children down to the custom element', () => {
      render(<ark.button render={<MyButton />}>Ark UI</ark.button>)
      expect(screen.getByTestId('child')).toHaveTextContent('Ark UI')
    })

    it('should compose refs', () => {
      const ref = vi.fn()
      render(<ark.button ref={ref} render={<MyButton />} />)
      expect(ref).toHaveBeenCalledWith(screen.getByTestId('child'))
    })
  })

  describe('render as function', () => {
    it('should render the returned element with the forwarded props', async () => {
      const onClick = vi.fn()

      render(
        <ark.button data-part="trigger" onClick={onClick} render={(props) => <MyButton {...props}>Ark UI</MyButton>} />,
      )

      const child = screen.getByTestId('child')
      // biome-ignore lint/complexity/useLiteralKeys: intentional
      expect(child.dataset['part']).toBe('trigger')

      await user.click(child)
      expect(onClick).toHaveBeenCalled()
    })

    it('should not double-apply props the render fn did not spread', async () => {
      const onClick = vi.fn()
      render(<ark.button onClick={onClick} render={(props) => <MyButton {...props} />} />)

      await user.click(screen.getByTestId('child'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should forward the state', () => {
      render(
        <ark.button
          state={{ open: true }}
          render={(props, state: { open: boolean }) => <MyButton {...props}>{state.open ? 'Open' : 'Closed'}</MyButton>}
        />,
      )

      expect(screen.getByTestId('child')).toHaveTextContent('Open')
    })

    it('should default the state to an empty object', () => {
      const spy = vi.fn()
      render(
        <ark.button
          render={(props, state) => {
            spy(state)
            return <MyButton {...props} />
          }}
        />,
      )

      expect(spy).toHaveBeenCalledWith({})
    })

    it('should compose refs', () => {
      const ref = vi.fn()
      render(<ark.button ref={ref} render={(props) => <MyButton {...props} />} />)
      expect(ref).toHaveBeenCalledWith(screen.getByTestId('child'))
    })

    it('should not render anything when the fn returns null', () => {
      const { container } = render(<ark.button render={() => null} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('should not detach a stable callback ref on parent re-render', async () => {
      const callbackRef = vi.fn()

      const RenderTest = () => {
        const [, rerender] = useReducer((count) => count + 1, 0)
        const setRef = useCallback((node: HTMLButtonElement | null) => {
          callbackRef(node)
        }, [])

        return (
          <>
            <ark.button ref={setRef} render={(props) => <MyButton {...props} />} />
            <button type="button" onClick={() => rerender()}>
              re-render
            </button>
          </>
        )
      }

      render(<RenderTest />)
      expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId('child'))

      const callsAfterMount = callbackRef.mock.calls.length
      await user.click(screen.getByRole('button', { name: /re-render/i }))

      expect(callbackRef).toHaveBeenCalledTimes(callsAfterMount)
    })
  })

  describe('asChild (deprecated)', () => {
    it('should still render only the child', () => {
      render(
        <ark.div data-testid="parent" asChild>
          <span data-testid="child">Ark UI</span>
        </ark.div>,
      )

      expect(() => screen.getByTestId('parent')).toThrow()
      expect(screen.getByTestId('child')).toBeVisible()
    })

    it('should not nest the child inside itself', () => {
      render(
        <ark.div onClick={vi.fn()} asChild>
          <span data-testid="child">Ark UI</span>
        </ark.div>,
      )

      expect(screen.getAllByTestId('child')).toHaveLength(1)
      expect(screen.getByTestId('child')).toHaveTextContent('Ark UI')
    })

    it('should throw when combined with render', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

      expect(() =>
        render(
          <ark.button asChild render={<MyButton />}>
            <MyButton />
          </ark.button>,
        ),
      ).toThrow(/cannot be used together/)

      spy.mockRestore()
    })
  })
})
