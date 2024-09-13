import { useEffect, useRef } from 'react'

interface FrameContentProps {
  onMount?(): void
  onUnmount?(): void
  children?: React.ReactNode
}

export const FrameContent = (props: FrameContentProps) => {
  const { onMount, onUnmount, children } = props
  const mountedRef = useRef(false)
  const calledRef = useRef(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!mountedRef.current && !calledRef.current) {
      onMount?.()
      mountedRef.current = true
      calledRef.current = true
    }

    return () => {
      if (mountedRef.current) {
        onUnmount?.()
        mountedRef.current = false
      }
    }
  }, [])

  return children
}
