import type { Context } from '@zag-js/tooltip'
import { defineComponent, type PropType } from 'vue'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { TooltipProvider } from './tooltip-context'
import { useTooltip } from './use-tooltip'

export type UseTooltipProps = Context

const VueTooltipProps = createVueProps<UseTooltipProps>({
  id: {
    type: String as PropType<UseTooltipProps['id']>,
  },
  ids: {
    type: Object as PropType<UseTooltipProps['ids']>,
  },
  openDelay: {
    type: Number as PropType<UseTooltipProps['openDelay']>,
  },
  closeDelay: {
    type: Number as PropType<UseTooltipProps['closeDelay']>,
  },
  closeOnPointerDown: {
    type: Boolean as PropType<UseTooltipProps['closeOnPointerDown']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<UseTooltipProps['closeOnEsc']>,
    default: true,
  },
  interactive: {
    type: Boolean as PropType<UseTooltipProps['interactive']>,
  },
  'aria-label': {
    type: String as PropType<UseTooltipProps['aria-label']>,
  },
  positioning: {
    type: Object as PropType<UseTooltipProps['positioning']>,
  },
  disabled: {
    type: Boolean as PropType<UseTooltipProps['disabled']>,
  },
  getRootNode: {
    type: Function as PropType<UseTooltipProps['getRootNode']>,
  },
})

export const Tooltip: ComponentWithProps<Partial<UseTooltipProps>> = defineComponent({
  name: 'Tooltip',
  props: VueTooltipProps,
  emits: ['open', 'close'],
  setup(props, { slots, emit }) {
    const api = useTooltip(emit, props as UseTooltipProps)

    TooltipProvider(api)

    return () => slots?.default?.()
  },
})

export type TooltipProps = Optional<Context, 'id'>
