import { computed, effect, inject, signal, untracked, type Signal, type WritableSignal } from '@angular/core'
import { ARK_FIELDSET_CONTEXT } from '@ark-ui/angular/fieldset'

export interface UseCheckboxGroupProps {
  /** The initial value of `value` when uncontrolled. */
  defaultValue?: string[] | undefined
  /** The controlled value of the checkbox group. */
  value?: string[] | undefined
  /** The name of the input fields in the checkbox group. */
  name?: string | undefined
  /** The callback to call when the value changes. */
  onValueChange?: ((value: string[]) => void) | undefined
  /** If `true`, the checkbox group is disabled. */
  disabled?: boolean | undefined
  /** If `true`, the checkbox group is read-only. */
  readOnly?: boolean | undefined
  /** If `true`, the checkbox group is invalid. */
  invalid?: boolean | undefined
  /** The maximum number of selected values. */
  maxSelectedValues?: number | undefined
}

export interface CheckboxGroupItemProps {
  value: string | undefined
}

export interface CheckboxGroupItemContext {
  checked: boolean | undefined
  onCheckedChange: () => void
  name: string | undefined
  disabled: boolean | undefined
  readOnly: boolean | undefined
  invalid: boolean | undefined
}

export interface UseCheckboxGroupReturn {
  readonly value: Signal<string[]>
  readonly name: Signal<string | undefined>
  readonly disabled: Signal<boolean>
  readonly readOnly: Signal<boolean>
  readonly invalid: Signal<boolean>
  isChecked(value: string | undefined): boolean
  setValue(value: string[]): void
  addValue(value: string): void
  removeValue(value: string): void
  toggleValue(value: string): void
  getItemProps(props: CheckboxGroupItemProps): CheckboxGroupItemContext
}

export interface UseCheckboxGroupOptions {
  context: () => UseCheckboxGroupProps
}

const uniqueValues = (values: string[]): string[] => Array.from(new Set(values.map((value) => String(value))))

export function useCheckboxGroup(options: UseCheckboxGroupOptions = { context: () => ({}) }): UseCheckboxGroupReturn {
  const fieldset = inject(ARK_FIELDSET_CONTEXT, { optional: true })
  const uncontrolledValue: WritableSignal<string[]> = signal(uniqueValues(options.context().defaultValue ?? []))
  let defaultEffectInitialized = false
  let defaultHydrationChecked = false
  let userTouched = false

  const resolved = computed(() => {
    const props = options.context()
    return {
      defaultValue: props.defaultValue,
      value: props.value,
      name: props.name,
      disabled: Boolean(props.disabled) || Boolean(fieldset?.disabled()),
      readOnly: Boolean(props.readOnly),
      invalid: Boolean(props.invalid) || Boolean(fieldset?.invalid()),
      maxSelectedValues: props.maxSelectedValues,
      onValueChange: props.onValueChange,
    }
  })

  const value = computed(() =>
    uniqueValues(
      resolved().value ?? (userTouched ? uncontrolledValue() : (resolved().defaultValue ?? uncontrolledValue())),
    ),
  )
  const name = computed(() => resolved().name)
  const disabled = computed(() => resolved().disabled)
  const readOnly = computed(() => resolved().readOnly)
  const invalid = computed(() => resolved().invalid)
  const interactive = computed(() => !(disabled() || readOnly()))
  const isAtMax = computed(() => {
    const max = resolved().maxSelectedValues
    return max != null && value().length >= max
  })

  const setValue = (nextValue: string[]): void => {
    const next = uniqueValues(nextValue)
    if (resolved().value === undefined) {
      userTouched = true
      uncontrolledValue.set(next)
    }
    untracked(() => resolved().onValueChange?.(next))
  }

  effect(() => {
    const next = resolved()
    if (!defaultEffectInitialized) {
      defaultEffectInitialized = true
      return
    }
    if (userTouched || next.value !== undefined || defaultHydrationChecked) return
    defaultHydrationChecked = true
    if (next.defaultValue === undefined) return
    uncontrolledValue.set(uniqueValues(next.defaultValue))
  })

  const isChecked = (itemValue: string | undefined): boolean => {
    if (itemValue == null) return false
    return value().some((current) => String(current) === String(itemValue))
  }

  const addValue = (itemValue: string): void => {
    if (!interactive()) return
    if (isChecked(itemValue)) return
    if (isAtMax()) return
    setValue(value().concat(itemValue))
  }

  const removeValue = (itemValue: string): void => {
    if (!interactive()) return
    setValue(value().filter((current) => String(current) !== String(itemValue)))
  }

  const toggleValue = (itemValue: string): void => {
    if (isChecked(itemValue)) {
      removeValue(itemValue)
    } else {
      addValue(itemValue)
    }
  }

  const getItemProps = (props: CheckboxGroupItemProps): CheckboxGroupItemContext => {
    const checked = props.value != null ? isChecked(props.value) : undefined
    return {
      checked,
      onCheckedChange() {
        if (props.value != null) {
          toggleValue(props.value)
        }
      },
      name: name(),
      disabled: disabled() || (isAtMax() && !checked) || undefined,
      readOnly: readOnly() || undefined,
      invalid: invalid() || undefined,
    }
  }

  return {
    value,
    name,
    disabled,
    readOnly,
    invalid,
    isChecked,
    setValue,
    addValue,
    removeValue,
    toggleValue,
    getItemProps,
  }
}
