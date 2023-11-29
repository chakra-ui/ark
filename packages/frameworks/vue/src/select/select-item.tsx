import type { ItemProps } from '@zag-js/select'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'
import { SelectItemProvider } from './select-item-context'

export type SelectItemProps = Assign<HTMLArkProps<'div'>, ItemProps>

export const SelectItem = defineComponent({
  name: 'SelectItem',
  props: {
    item: {
      type: Object as PropType<SelectItemProps['item']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSelectContext()
    SelectItemProvider(props)

    const itemState = computed(() => api.value.getItemState(props))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(itemState)}
      </ark.div>
    )
  },
})
