import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useSelectContext } from './select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = defineComponent<SelectControlProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const isValueEmpty = computed(() => api.value.value.length === 0)

    return () => (
      <>
        <ark.div {...api.value.controlProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <select {...api.value.hiddenSelectProps}>
          {isValueEmpty.value && <option value="" />}
          {api.value.collection.toArray().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    )
  },
  {
    name: 'SelectControl',
  },
)
