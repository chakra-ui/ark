import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { composeRefs, useComposedRefs } from './compose-refs.ts'

describe('Util: composeRefs', () => {
  it('should compose callback and object refs', () => {
    const node = document.createElement('div')
    const callbackRef = vi.fn()
    const objectRef = { current: null as HTMLDivElement | null }

    composeRefs(callbackRef, objectRef)(node)

    expect(callbackRef).toHaveBeenCalledWith(node)
    expect(objectRef.current).toBe(node)
  })

  it('should run callback ref cleanups', () => {
    const node = document.createElement('div')
    const cleanup = vi.fn()
    const callbackRef = vi.fn(() => cleanup)

    const dispose = composeRefs(callbackRef)(node) as VoidFunction | undefined
    dispose?.()

    expect(cleanup).toHaveBeenCalledTimes(1)
  })
})

describe('Util: useComposedRefs', () => {
  it('should keep stable refs attached across re-renders', async () => {
    const callbackRef = vi.fn()

    const ComponentUnderTest = () => {
      const [, setCount] = useState(0)
      const objectRef = useRef<HTMLDivElement | null>(null)
      const composedRefs = useComposedRefs(callbackRef, objectRef)

      return (
        <>
          <div data-testid="node" ref={composedRefs} />
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            re-render
          </button>
        </>
      )
    }

    render(<ComponentUnderTest />)
    expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId('node'))

    const callsAfterMount = callbackRef.mock.calls.length
    await user.click(screen.getByRole('button', { name: /re-render/i }))

    expect(callbackRef).toHaveBeenCalledTimes(callsAfterMount)
  })

  it('should reattach refs when a constituent callback ref changes', () => {
    const firstRef = vi.fn()
    const secondRef = vi.fn()

    const ComponentUnderTest = (props: { callbackRef: (node: HTMLDivElement | null) => void }) => {
      const composedRefs = useComposedRefs(props.callbackRef)
      return <div data-testid="node" ref={composedRefs} />
    }

    const { rerender } = render(<ComponentUnderTest callbackRef={firstRef} />)
    const node = screen.getByTestId('node')

    rerender(<ComponentUnderTest callbackRef={secondRef} />)

    expect(firstRef).toHaveBeenCalledWith(node)
    expect(firstRef).toHaveBeenCalledWith(null)
    expect(secondRef).toHaveBeenCalledWith(node)
  })
})
