import { useEffect, useRef } from 'react'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const render = useRef(false)
  const called = useRef(false)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const mounted = render.current
    const run = mounted && called.current
    if (run) return effect()
    called.current = true
  }, deps)
  useEffect(() => {
    render.current = true
    return () => {
      render.current = false
    }
  }, [])
}
