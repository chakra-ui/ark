import { selectAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectValueTextProps extends HTMLArkProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}

export const SelectValueText = defineComponent<SelectValueTextProps>(
  (props, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.span {...selectAnatomy.build().valueText.attrs} {...attrs}>
        {slots.default?.() || api.value.valueAsString || props.placeholder}
      </ark.span>
    )
  },
  {
    name: 'SelectValueText',
    props: {
      placeholder: {
        type: String,
      },
    },
  },
)
