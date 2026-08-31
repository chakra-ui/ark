import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Suspense, type ReactElement, type ReactNode, forwardRef, isValidElement, useCallback, useReducer } from 'react'
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

  interface FlightChunk {
    status: 'pending' | 'fulfilled'
    value: ReactElement | null
    listeners: (() => void)[]
    then(onFulfill: () => void): void
  }

  function createChunk(status: FlightChunk['status'], value: ReactElement | null): FlightChunk {
    return {
      status,
      value,
      listeners: [],
      // biome-ignore lint/suspicious/noThenProperty: a Flight chunk is intentionally thenable
      then(onFulfill) {
        this.listeners.push(onFulfill)
      },
    }
  }

  function readChunk(chunk: FlightChunk) {
    if (chunk.status === 'fulfilled') return chunk.value
    throw chunk
  }

  function toLazy(chunk: FlightChunk): ReactNode {
    return { $$typeof: Symbol.for('react.lazy'), _payload: chunk, _init: readChunk } as unknown as ReactNode
  }

  function createLazyChild(element: ReactElement): ReactNode {
    return toLazy(createChunk('fulfilled', element))
  }

  function createPendingLazyChild(element: ReactElement) {
    const chunk = createChunk('pending', null)
    const resolve = () => {
      chunk.status = 'fulfilled'
      chunk.value = element
      for (const listener of chunk.listeners) listener()
    }
    return [toLazy(chunk), resolve] as const
  }

  it('should unwrap a react.lazy child from the RSC flight protocol', () => {
    const lazyChild = createLazyChild(
      <span data-testid="child" className="child" style={{ color: 'blue' }}>
        Ark UI
      </span>,
    )

    expect(isValidElement(lazyChild)).toBe(false)

    const { container } = render(
      <ark.div data-testid="parent" className="parent" style={{ background: 'red' }} asChild>
        {lazyChild}
      </ark.div>,
    )

    expect(container.querySelector('div')).toBeNull()

    const child = screen.getByTestId('child')
    expect(child).toBeVisible()
    expect(child).toHaveClass('child parent')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'blue' })
    expect(child).toHaveTextContent('Ark UI')
  })

  it('should suspend until a pending react.lazy child resolves', async () => {
    const [lazyChild, resolve] = createPendingLazyChild(<span data-testid="child">Ark UI</span>)

    render(
      <Suspense fallback={<span data-testid="fallback">loading</span>}>
        <ark.div data-part="parent" asChild>
          {lazyChild}
        </ark.div>
      </Suspense>,
    )

    expect(screen.getByTestId('fallback')).toBeVisible()
    expect(screen.queryByTestId('child')).toBeNull()

    await act(async () => resolve())

    const child = await screen.findByTestId('child')
    expect(child).toHaveAttribute('data-part', 'parent')
    expect(child).toHaveTextContent('Ark UI')
  })

  it('should compose refs through a react.lazy child', () => {
    const parentRef = vi.fn()
    const childRef = vi.fn()

    render(
      <ark.div ref={parentRef} data-part="parent" asChild>
        {createLazyChild(<span ref={childRef} data-testid="child" />)}
      </ark.div>,
    )

    const child = screen.getByTestId('child')
    expect(child).toHaveAttribute('data-part', 'parent')
    expect(parentRef).toHaveBeenCalledWith(child)
    expect(childRef).toHaveBeenCalledWith(child)
  })

  it('should leave non-lazy invalid children untouched', () => {
    const { container } = render(
      <ark.div data-testid="parent" asChild>
        <span data-testid="first" />
        <span data-testid="second" />
      </ark.div>,
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render nothing when asChild has no valid child', () => {
    const { container } = render(<ark.div asChild>text</ark.div>)
    expect(container.firstChild).toBeNull()
  })
})
