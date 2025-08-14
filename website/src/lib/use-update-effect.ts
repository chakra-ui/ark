'use client'

import { useEffect, useRef } from 'react'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const renderCycleRef = useRef(false)
  const effectCycleRef = useRef(false)

  useEffect(() => {
    const isMounted = renderCycleRef.current
    const shouldRun = isMounted && effectCycleRef.current
    if (shouldRun) {
      return effect()
    }
    effectCycleRef.current = true
    // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  }, deps)

  useEffect(() => {
    renderCycleRef.current = true
    return () => {
      renderCycleRef.current = false
    }
  }, [])
}
