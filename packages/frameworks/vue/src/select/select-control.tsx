import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectControlProps = HTMLArkProps<'div'>

export const SelectControl = defineComponent({
  name: 'SelectControl',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <>
        <ark.div {...api.value.controlProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <select {...api.value.hiddenSelectProps}>
          {api.value.collection.toArray().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    )
  },
})
