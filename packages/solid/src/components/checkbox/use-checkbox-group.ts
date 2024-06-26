import { type Accessor, createMemo } from 'solid-js'
import { useControllableState } from '../../utils/use-controllable-state'

export interface UseCheckboxGroupProps {
  /**
   * The initial value of `value` when uncontrolled
   */
  defaultValue?: Accessor<string[]> | string[]
  /**
   * The controlled value of the checkbox group
   */
  value?: Accessor<string[]>
  /**
   * The name of the input fields in the checkbox group
   * (Useful for form submission).
   */
  name?: string
  /**
   * The callback to call when the value changes
   */
  onValueChange?: (value: string[]) => void
  /**
   * If `true`, the checkbox group is disabled
   */
  disabled?: boolean
  /**
   * If `true`, the checkbox group is read-only
   */
  readOnly?: boolean
}

export interface CheckboxGroupItemProps {
  value: string | undefined
}

export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const interative = createMemo(() => !(props.disabled || props.readOnly))

  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue || [],
    onChange: props.onValueChange,
  })

  return createMemo(() => {
    const isChecked = (val: string | undefined) => {
      return value().some((v) => String(v) === String(val))
    }

    const toggleValue = (val: string) => {
      isChecked(val) ? removeValue(val) : addValue(val)
    }

    const addValue = (val: string) => {
      if (!interative()) return
      if (isChecked(val)) return
      setValue(value().concat(val))
    }

    const removeValue = (val: string) => {
      if (!interative()) return
      setValue(value().filter((v) => String(v) !== String(val)))
    }

    const getItemProps = (itemProps: CheckboxGroupItemProps) => {
      return {
        checked: itemProps.value != null ? isChecked(itemProps.value) : undefined,
        onCheckedChange() {
          if (itemProps.value != null) {
            toggleValue(itemProps.value)
          }
        },
        name: props.name,
        disabled: props.disabled,
        readOnly: props.readOnly,
      }
    }

    return {
      isChecked,
      value,
      name: props.name,
      disabled: props.disabled,
      readOnly: props.readOnly,
      setValue,
      addValue,
      toggleValue,
      getItemProps,
    }
  })
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
