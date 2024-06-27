import { computed, toRefs } from 'vue'
import type { EmitFn } from '../../types'
import { useVModel } from '../use-v-model'
import type { GroupEmits, GroupProps } from './checkbox-group.types'

export interface UseCheckboxGroupProps extends GroupProps {}
export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>

interface CheckboxGroupItemProps {
  value: string | undefined
}

export function useCheckboxGroup(props: GroupProps, emit?: EmitFn<GroupEmits>) {
  const interative = computed(() => !(props.disabled || props.readOnly))

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

  const addValue = (val: string) => {
    if (!interative.value) return
    if (isChecked(val)) return
    valueRef.value = valueRef.value.concat(val)
  }

  const removeValue = (val: string) => {
    if (!interative.value) return
    valueRef.value = valueRef.value.filter((v) => String(v) !== String(val))
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
  const setValue = (value: string[]) => {
    valueRef.value = value
  }

  return computed(() => ({
    isChecked,
    value: valueRef.value,
    name: props.name,
    disabled: props.disabled,
    readOnly: props.readOnly,
    addValue,
    setValue,
    toggleValue,
    getItemProps,
  }))
}
