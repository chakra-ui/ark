import type { Accessor } from '$lib/types'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { untrack } from 'svelte'
import { useFieldsetContext } from '../fieldset'

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

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>

export const useCheckboxGroup = (props: MaybeFunction<UseCheckboxGroupProps> = {}) => {
  const fieldset = useFieldsetContext()
  const resolvedProps = $derived(runIfFn(props) || {})

  let valueState = $state<string[]>(untrack(() => resolvedProps.defaultValue) ?? [])
  const value = $derived(resolvedProps.value !== undefined ? resolvedProps.value : valueState)

  const disabled = $derived(resolvedProps.disabled ?? fieldset?.()?.disabled)
  const invalid = $derived(resolvedProps.invalid ?? fieldset?.()?.invalid)
  const interactive = $derived(!(disabled || resolvedProps.readOnly))

  const setValue = (newValue: string[]) => {
    if (resolvedProps.value === undefined) {
      valueState = newValue
    }
    resolvedProps.onValueChange?.(newValue)
  }

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

  const getItemProps = (itemProps: CheckboxGroupItemProps) => {
    return {
      checked: itemProps.value != null ? isChecked(itemProps.value) : undefined,
      onCheckedChange() {
        if (itemProps.value != null) {
          toggleValue(itemProps.value)
        }
      },
      name: resolvedProps.name,
      disabled: !!disabled,
      readOnly: !!resolvedProps.readOnly,
      invalid: !!invalid,
    }
  }

  const api = $derived({
    isChecked,
    value,
    name: resolvedProps.name,
    disabled: !!disabled,
    readOnly: !!resolvedProps.readOnly,
    invalid: !!invalid,
    setValue,
    addValue,
    toggleValue,
    getItemProps,
  })

  return () => api
}
