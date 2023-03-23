import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSelectContext } from './select-context'

export interface SelectOptionGroupLabelProps extends HTMLArkProps<'label'> {
  htmlFor: string
}

export const SelectOptionGroupLabel: ComponentWithProps<SelectOptionGroupLabelProps> =
  defineComponent({
    name: 'SelectOptionGroupLabel',
    props: {
      htmlFor: String as PropType<SelectOptionGroupLabelProps['htmlFor']>,
    },
    setup(props, { slots, attrs }) {
      const api = useSelectContext()

      return () => (
        <ark.label
          {...api.value.getOptionGroupLabelProps({ htmlFor: props.htmlFor as string })}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </ark.label>
      )
    },
  })
