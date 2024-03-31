import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  onChange?: (value: T) => void
  defaultValue?: T
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, onChange, defaultValue } = props

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const isControlled = value !== undefined
  const wasControlled = useRef(isControlled)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && wasControlled.current !== isControlled) {
      console.warn(
        `A component is changing from ${
          wasControlled ? 'controlled' : 'uncontrolled'
        } to ${isControlled ? 'controlled' : 'uncontrolled'}.`,
      )
    }

    wasControlled.current = isControlled
  }, [isControlled])

  const currentValue = isControlled ? value : uncontrolledValue

  const setValue = useCallback(
    (value: T) => {
      if (isControlled) {
        return onChange?.(value)
      } else {
        setUncontrolledValue(value)
        return onChange?.(value)
      }
    },
    [isControlled, onChange],
  )

  return [currentValue as T, setValue] as const
}
