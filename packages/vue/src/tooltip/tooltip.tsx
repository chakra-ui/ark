import { defineComponent, type PropType } from 'vue'
import { createVueProps, type ComponentWithProps } from '../utils'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipContext } from './use-tooltip'

export type TooltipProps = UseTooltipContext

const VueTooltipProps = createVueProps<TooltipProps>({
  id: {
    type: String as PropType<TooltipProps['id']>,
  },
  ids: {
    type: Object as PropType<TooltipProps['ids']>,
  },
  openDelay: {
    type: Number as PropType<TooltipProps['openDelay']>,
  },
  closeDelay: {
    type: Number as PropType<TooltipProps['closeDelay']>,
  },
  closeOnPointerDown: {
    type: Boolean as PropType<TooltipProps['closeOnPointerDown']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<TooltipProps['closeOnEsc']>,
    default: true,
  },
  interactive: {
    type: Boolean as PropType<TooltipProps['interactive']>,
  },
  'aria-label': {
    type: String as PropType<TooltipProps['aria-label']>,
  },
  positioning: {
    type: Object as PropType<TooltipProps['positioning']>,
  },
  disabled: {
    type: Boolean as PropType<TooltipProps['disabled']>,
  },
  getRootNode: {
    type: Function as PropType<TooltipProps['getRootNode']>,
  },
  open: {
    type: Boolean as PropType<TooltipProps['open']>,
  },
})

export const Tooltip: ComponentWithProps<Partial<TooltipProps>> = defineComponent({
  name: 'Tooltip',
  props: VueTooltipProps,
  emits: ['open', 'close'],
  setup(props, { slots, emit }) {
    const api = useTooltip(emit, props as TooltipProps)

    TooltipProvider(api)

    return () => slots?.default?.()
  },
})
