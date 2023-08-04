import type { OptionGroupProps } from '@zag-js/combobox'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupProps = Assign<HTMLArkProps<'ul'>, OptionGroupProps>

export const ComboboxOptionGroup: ComponentWithProps<ComboboxOptionGroupProps> = defineComponent({
  name: 'ComboboxOptionGroup',
  props: {
    label: {
      type: String as PropType<ComboboxOptionGroupProps['label']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const optionGroupProps = computed<OptionGroupProps>(() => ({
      label: props.label,
    }))

    const api = useComboboxContext()

    return () => (
      <ark.ul {...api.value.getOptionGroupProps(optionGroupProps.value)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.ul>
    )
  },
})
