import type { Context } from '@zag-js/popover'
import { defineComponent, type PropType } from 'vue'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { PopoverProvider } from './popover-context'
import { usePopover } from './use-popover'

export type PopoverContext = Context & {
  /**
   * Control the open state of the popover.
   *
   * @default false
   */
  isOpen?: boolean
}
export type UsePopoverProps = PopoverContext

const VuePopoverProps = createVueProps<Partial<UsePopoverProps>>({
  autoFocus: {
    type: Boolean as PropType<UsePopoverProps['autoFocus']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<UsePopoverProps['closeOnEsc']>,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<UsePopoverProps['closeOnInteractOutside']>,
  },
  getRootNode: {
    type: Function as PropType<UsePopoverProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UsePopoverProps['id']>,
  },
  ids: {
    type: Object as PropType<UsePopoverProps['ids']>,
  },
  initialFocusEl: {
    type: [Object, Function] as PropType<UsePopoverProps['initialFocusEl']>,
  },
  isOpen: {
    type: Boolean as PropType<UsePopoverProps['isOpen']>,
    default: false,
  },
  modal: {
    type: Boolean as PropType<UsePopoverProps['modal']>,
  },
  portalled: {
    type: Boolean as PropType<UsePopoverProps['portalled']>,
  },
  open: {
    type: Boolean as PropType<UsePopoverProps['open']>,
  },
  positioning: {
    type: Object as PropType<UsePopoverProps['positioning']>,
  },
})

export const Popover: ComponentWithProps<Partial<UsePopoverProps>> = defineComponent({
  name: 'Popover',
  props: VuePopoverProps,
  emits: [
    'close',
    'escape-key-down',
    'focus-outside',
    'interact-outside',
    'open',
    'pointer-down-outside',
  ],
  setup(props, { slots, emit }) {
    const api = usePopover(emit, props as Partial<UsePopoverProps>)

    PopoverProvider(api)

    return () => slots.default?.(api.value)
  },
})

export type PopoverProps = Optional<UsePopoverProps, 'id'>
