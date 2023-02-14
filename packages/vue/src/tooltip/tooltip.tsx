import { computed, defineComponent, PropType } from 'vue'
import type { ComponentWithProps } from '../utils'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, UseTooltipProps } from './use-tooltip'

type UseTooltipPropsContext = UseTooltipProps['context']

export type TooltipProps = UseTooltipPropsContext

const VueTooltipProps = {
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
}

export const Tooltip: ComponentWithProps<TooltipProps> = defineComponent({
  name: 'Tooltip',
  props: VueTooltipProps,
  emits: ['open', 'close'],
  setup(props, { slots, emit }) {
    const tooltipProps = computed<UseTooltipProps>(() => ({
      context: props,
      emit,
    }))

    const api = useTooltip(tooltipProps.value)

    TooltipProvider(api)

    return () => slots?.default?.()
  },
})
