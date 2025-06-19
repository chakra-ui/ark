import { useEffect, useRef } from 'react'

interface FrameContentProps {
  onMount?: VoidFunction | undefined
  onUnmount?: VoidFunction | undefined
  children?: React.ReactNode | undefined
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
