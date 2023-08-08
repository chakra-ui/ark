import { type OptionProps } from '@zag-js/combobox'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionProps = Assign<HTMLArkProps<'div'>, OptionProps>

export const ComboboxOption: ComponentWithProps<ComboboxOptionProps> = defineComponent({
  name: 'ComboboxOption',
  props: {
    index: {
      type: Number as PropType<ComboboxOptionProps['index']>,
    },
    count: {
      type: Number as PropType<ComboboxOptionProps['count']>,
    },
    disabled: {
      type: Boolean as PropType<ComboboxOptionProps['disabled']>,
    },
    label: {
      type: String as PropType<ComboboxOptionProps['label']>,
      required: true,
    },
    value: {
      type: String as PropType<ComboboxOptionProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const comboboxOptionProps = computed<OptionProps>(() => ({
      index: props.index,
      count: props.count,
      disabled: props.disabled,
      label: props.label,
      value: props.value,
    }))

    const api = useComboboxContext()

    return () => {
      const validChildren = getValidChildren(slots)
      return (
        <ark.div {...api.value.getOptionProps(comboboxOptionProps.value)} {...attrs}>
          {() => (validChildren.length ? validChildren : comboboxOptionProps.value.label)}
        </ark.div>
      )
    }
  },
})
