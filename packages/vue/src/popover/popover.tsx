import type { Context } from '@zag-js/popover'
import { defineComponent, type PropType } from 'vue'
import { createVueProps } from '../utils'
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
export type PopoverProps = PopoverContext

const VuePopoverProps = createVueProps({
  autoFocus: {
    type: Boolean as PropType<PopoverProps['autoFocus']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<PopoverProps['closeOnEsc']>,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<PopoverProps['closeOnInteractOutside']>,
  },
  getRootNode: {
    type: Function as PropType<PopoverProps['getRootNode']>,
  },
  id: {
    type: String as PropType<PopoverProps['id']>,
  },
  ids: {
    type: Object as PropType<PopoverProps['ids']>,
  },
  initialFocusEl: {
    type: [Object, Function] as PropType<PopoverProps['initialFocusEl']>,
  },
  isOpen: {
    type: Boolean as PropType<PopoverProps['isOpen']>,
    default: false,
  },
  modal: {
    type: Boolean as PropType<PopoverProps['modal']>,
  },
  portalled: {
    type: Boolean as PropType<PopoverProps['portalled']>,
  },
  open: {
    type: Boolean as PropType<PopoverProps['open']>,
  },
  positioning: {
    type: Object as PropType<PopoverProps['positioning']>,
  },
})

export const Popover = defineComponent({
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
    const api = usePopover(emit, props)

    PopoverProvider(api)

    return () => slots.default?.(api.value)
  },
})
