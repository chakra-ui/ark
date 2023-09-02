import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLArkProps<'div'>

export const TooltipContent = defineComponent({
  name: 'TooltipContent',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
