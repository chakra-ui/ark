import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useRef, useState } from 'react'
import type { RefObject } from 'react'
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

  it('should not return a cleanup function when no ref provides one', () => {
    const node = document.createElement('div')
    const callbackRef = vi.fn()
    const objectRef = { current: null as HTMLDivElement | null }

    const dispose = composeRefs(callbackRef, objectRef)(node)

    expect(dispose).toBeUndefined()
  })

  it('should reset a plain callback ref to null when a sibling ref returns a cleanup', () => {
    const node = document.createElement('div')
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)
    const plainCallbackRef = vi.fn()

    const dispose = composeRefs(refWithCleanup, plainCallbackRef)(node) as VoidFunction | undefined
    expect(plainCallbackRef).toHaveBeenCalledWith(node)
    expect(plainCallbackRef).not.toHaveBeenCalledWith(null)

    dispose?.()

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(plainCallbackRef).toHaveBeenCalledWith(null)
  })

  it('should reset an object ref to null when a sibling ref returns a cleanup', () => {
    const node = document.createElement('div')
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)
    const objectRef = { current: null as HTMLDivElement | null }

    const dispose = composeRefs(refWithCleanup, objectRef)(node) as VoidFunction | undefined
    expect(objectRef.current).toBe(node)

    dispose?.()

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(objectRef.current).toBeNull()
  })

  it('should clean up every ref type when mixed together', () => {
    const node = document.createElement('div')
    const cleanupA = vi.fn()
    const cleanupB = vi.fn()
    const refWithCleanupA = vi.fn(() => cleanupA)
    const refWithCleanupB = vi.fn(() => cleanupB)
    const plainCallbackRef = vi.fn()
    const objectRefA = { current: null as HTMLDivElement | null }
    const objectRefB = { current: null as HTMLDivElement | null }

    const dispose = composeRefs(refWithCleanupA, plainCallbackRef, objectRefA, refWithCleanupB, objectRefB)(node) as
      VoidFunction | undefined

    dispose?.()

    expect(cleanupA).toHaveBeenCalledTimes(1)
    expect(cleanupB).toHaveBeenCalledTimes(1)
    expect(plainCallbackRef).toHaveBeenCalledWith(null)
    expect(objectRefA.current).toBeNull()
    expect(objectRefB.current).toBeNull()
  })

  it('should ignore undefined and null refs', () => {
    const node = document.createElement('div')
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)

    expect(() => composeRefs(refWithCleanup, undefined, null as any)(node)).not.toThrow()
  })

  it('should do nothing and return no cleanup when every ref is nullish', () => {
    const node = document.createElement('div')

    const dispose = composeRefs(undefined, null as any, undefined)(node)

    expect(dispose).toBeUndefined()
  })

  it('should not call a plain callback ref again on cleanup beyond the initial null call', () => {
    const node = document.createElement('div')
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)
    const plainCallbackRef = vi.fn()

    const dispose = composeRefs(refWithCleanup, plainCallbackRef)(node) as VoidFunction | undefined
    dispose?.()

    expect(plainCallbackRef).toHaveBeenCalledTimes(2)
    expect(plainCallbackRef).toHaveBeenNthCalledWith(1, node)
    expect(plainCallbackRef).toHaveBeenNthCalledWith(2, null)
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

  it('should tear down the old cleanup-ref bundle and set up the new one when the ref set changes', () => {
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)
    const plainCallbackRef = vi.fn()

    const ComponentUnderTest = (props: { includeCleanupRef: boolean }) => {
      const composedRefs = useComposedRefs(props.includeCleanupRef ? refWithCleanup : undefined, plainCallbackRef)
      return <div data-testid="node" ref={composedRefs} />
    }

    const { rerender } = render(<ComponentUnderTest includeCleanupRef />)
    const node = screen.getByTestId('node')

    expect(refWithCleanup).toHaveBeenCalledWith(node)
    expect(plainCallbackRef).toHaveBeenCalledWith(node)
    expect(plainCallbackRef).not.toHaveBeenCalledWith(null)

    rerender(<ComponentUnderTest includeCleanupRef={false} />)

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(plainCallbackRef).toHaveBeenCalledWith(null)
    expect(plainCallbackRef).toHaveBeenLastCalledWith(node)
  })

  it('should detach plain callback and object refs on unmount when a sibling ref uses cleanup', () => {
    const cleanup = vi.fn()
    const refWithCleanup = vi.fn(() => cleanup)
    const plainCallbackRef = vi.fn()

    const ComponentUnderTest = (props: { objectRef: RefObject<HTMLDivElement | null> }) => {
      const composedRefs = useComposedRefs(refWithCleanup, plainCallbackRef, props.objectRef)
      return <div data-testid="node" ref={composedRefs} />
    }

    const objectRef = { current: null as HTMLDivElement | null }
    const { unmount } = render(<ComponentUnderTest objectRef={objectRef} />)
    const node = screen.getByTestId('node')

    expect(objectRef.current).toBe(node)
    expect(plainCallbackRef).toHaveBeenCalledWith(node)

    unmount()

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(plainCallbackRef).toHaveBeenCalledWith(null)
    expect(objectRef.current).toBeNull()
  })
})
