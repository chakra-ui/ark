import { useCallback, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, onChange, defaultValue } = props

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const controlled = value !== undefined
  const currentValue = controlled ? value : uncontrolledValue

  const setValue = useCallback(
    (value: T) => {
      if (controlled) {
        return onChange?.(value)
      }
      setUncontrolledValue(value)
      return onChange?.(value)
    },
    [controlled, onChange],
  )

  return [currentValue as T, setValue] as const
}
