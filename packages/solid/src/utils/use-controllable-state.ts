import { type Accessor, createMemo, createSignal, untrack } from 'solid-js'
import { runIfFn } from './run-if-fn'

export interface UseControllableStateProps<T> {
  value?: Accessor<T | undefined>
  defaultValue?: Accessor<T | undefined> | T
  onChange?: (value: T) => void
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = createSignal(runIfFn(props.defaultValue))
  const controlled = createMemo(() => props.value?.() !== undefined)

  const currentValue = createMemo(() => (controlled() ? props.value?.() : uncontrolledValue()))

  const setValue = (next: Exclude<T, Function> | ((prev: T) => T)) => {
    untrack(() => {
      const nextValue = runIfFn(next, currentValue() as T)

      if (controlled()) {
        return props.onChange?.(nextValue)
      }

      setUncontrolledValue(nextValue as Exclude<T, Function>)
      return props.onChange?.(nextValue)
    })
  }

  return [currentValue as Accessor<T>, setValue] as const
}
