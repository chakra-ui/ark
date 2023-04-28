import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useSelectContext } from './select-context'

type OptionProps = Parameters<ReturnType<typeof useSelectContext>['value']['getOptionProps']>[0]
export interface SelectOptionProps extends HTMLArkProps<'li'>, OptionProps {}

const VueSelectOptionProps = {
  disabled: {
    type: Boolean as PropType<OptionProps['disabled']>,
  },
  label: {
    type: String as PropType<OptionProps['label']>,
    required: true,
  },
  value: {
    type: String as PropType<OptionProps['value']>,
    required: true,
  },
  valueText: {
    type: String as PropType<OptionProps['valueText']>,
  },
}

export const SelectOption: ComponentWithProps<SelectOptionProps> = defineComponent({
  name: 'SelectOption',
  props: VueSelectOptionProps,
  setup(props, { slots, attrs }) {
    const selectOptionProps = computed<OptionProps>(() => ({
      label: props.label as string,
      disabled: props.disabled,
      value: props.value as string,
      valueText: props.valueText,
    }))

    const api = useSelectContext()

    return () => (
      <ark.li {...api.value.getOptionProps(selectOptionProps.value)} {...attrs}>
        {() => (slots.default?.() ? slots.default() : selectOptionProps.value.label)}
      </ark.li>
    )
  },
})
