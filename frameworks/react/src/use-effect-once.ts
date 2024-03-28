import { useEffect, useRef, type EffectCallback } from 'react'

export function useEffectOnce(callback: EffectCallback) {
  const savedCallback = useRef(callback)
  const effectGuard = useRef(false)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (effectGuard.current !== true) {
      effectGuard.current = true
      savedCallback.current()
    }
  }, [])
}
