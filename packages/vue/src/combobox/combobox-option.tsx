import type { connect } from '@zag-js/combobox'
import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

type OptionProps = Parameters<ReturnType<typeof connect>['getOptionProps']>[0]

export type ComboboxOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

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
        <ark.ul {...api.value.getOptionProps(comboboxOptionProps.value)} {...attrs}>
          {() => (validChildren.length ? validChildren : comboboxOptionProps.value.label)}
        </ark.ul>
      )
    }
  },
})
