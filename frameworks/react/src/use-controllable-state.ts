import { useCallback, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  onChange?: (value: T) => void
  defaultValue?: T
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, onChange, defaultValue } = props

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const isControlled = value !== undefined
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
