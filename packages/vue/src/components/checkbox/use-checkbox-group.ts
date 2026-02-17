import { computed, toRefs } from 'vue'
import type { EmitFn } from '../../types'
import { toBooleanValue } from '../../utils/boolean'
import { useFieldsetContext } from '../fieldset'
import { useVModel } from '../use-v-model'
import type { GroupEmits, GroupProps } from './checkbox-group.types'

export interface UseCheckboxGroupProps extends GroupProps {}
export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>

interface CheckboxGroupItemProps {
  value: string | undefined
}

export function useCheckboxGroup(props: GroupProps, emit?: EmitFn<GroupEmits>) {
  const fieldset = useFieldsetContext()
  const disabled = computed(() => props.disabled ?? fieldset?.value?.disabled)
  const invalid = computed(() => props.invalid ?? fieldset?.value?.invalid)
  const interactive = computed(() => !(disabled.value || props.readOnly))

  const { defaultValue } = toRefs(props)

  const valueRef = useVModel(props, 'modelValue', emit, {
    defaultValue: defaultValue?.value ?? [],
    passive: (props.modelValue === undefined) as false,
    eventName: ['valueChange', 'update:modelValue'],
  })

  const isChecked = (val: string | undefined) => {
    return valueRef.value.some((v) => String(v) === String(val))
  }

  const toggleValue = (val: string) => {
    isChecked(val) ? removeValue(val) : addValue(val)
  }

  const isAtMax = computed(() => props.maxSelectedValues != null && valueRef.value.length >= props.maxSelectedValues)

  const addValue = (val: string) => {
    if (!interactive.value) return
    if (isChecked(val)) return
    if (isAtMax.value) return
    valueRef.value = valueRef.value.concat(val)
  }

  const removeValue = (val: string) => {
    if (!interactive.value) return
    valueRef.value = valueRef.value.filter((v) => String(v) !== String(val))
  }

  const getItemProps = (itemProps: CheckboxGroupItemProps) => {
    const checked = itemProps.value != null ? isChecked(itemProps.value) : undefined
    return {
      checked,
      onCheckedChange() {
        if (itemProps.value != null) {
          toggleValue(itemProps.value)
        }
      },
      name: props.name,
      disabled: toBooleanValue(disabled.value) || (isAtMax.value && !checked),
      readOnly: props.readOnly,
      invalid: invalid.value,
    }
  }
  const setValue = (value: string[]) => {
    valueRef.value = value
  }

  return computed(() => ({
    isChecked,
    value: valueRef.value,
    name: props.name,
    disabled: toBooleanValue(disabled.value),
    readOnly: props.readOnly,
    invalid: invalid.value,
    addValue,
    setValue,
    toggleValue,
    getItemProps,
  }))
}
