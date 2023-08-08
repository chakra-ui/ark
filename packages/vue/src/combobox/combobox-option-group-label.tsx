import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export interface ComboboxOptionGroupLabelProps extends HTMLArkProps<'div'> {
  htmlFor: string
}

export const ComboboxOptionGroupLabel: ComponentWithProps<ComboboxOptionGroupLabelProps> =
  defineComponent({
    name: 'ComboboxOptionGroupLabel',
    props: {
      htmlFor: String as PropType<ComboboxOptionGroupLabelProps['htmlFor']>,
    },
    setup(props, { slots, attrs }) {
      const api = useComboboxContext()

      return () => (
        <ark.div
          {...api.value.getOptionGroupLabelProps({ htmlFor: props.htmlFor as string })}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </ark.div>
      )
    },
  })
