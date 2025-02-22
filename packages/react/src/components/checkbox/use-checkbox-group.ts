import { useControllableState } from '../../utils/use-controllable-state'
import { useEvent } from '../../utils/use-event'

export interface UseCheckboxGroupProps {
  /**
   * The initial value of `value` when uncontrolled
   */
  defaultValue?: string[]
  /**
   * The controlled value of the checkbox group
   */
  value?: string[]
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
  /**
   * If `true`, the checkbox group is invalid
   */
  invalid?: boolean
}

export interface CheckboxGroupItemProps {
  value: string | undefined
}

export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const { defaultValue, value: controlledValue, onValueChange, disabled, readOnly, name, invalid } = props

  const interactive = !(disabled || readOnly)

  const onChangeProp = useEvent(onValueChange, { sync: true })

  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue: defaultValue || [],
    onChange: onChangeProp,
  })

  const isChecked = (val: string | undefined) => {
    return value.some((v) => String(v) === String(val))
  }

  const toggleValue = (val: string) => {
    isChecked(val) ? removeValue(val) : addValue(val)
  }

  const addValue = (val: string) => {
    if (!interactive) return
    if (isChecked(val)) return
    setValue(value.concat(val))
  }

  const removeValue = (val: string) => {
    if (!interactive) return
    setValue(value.filter((v) => String(v) !== String(val)))
  }

  const getItemProps = (props: CheckboxGroupItemProps) => {
    return {
      checked: props.value != null ? isChecked(props.value) : undefined,
      onCheckedChange() {
        if (props.value != null) {
          toggleValue(props.value)
        }
      },
      name,
      disabled,
      readOnly,
      invalid,
    }
  }

  return {
    isChecked,
    value,
    name,
    disabled: !!disabled,
    readOnly: !!readOnly,
    invalid: !!invalid,
    setValue,
    addValue,
    toggleValue,
    getItemProps,
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
