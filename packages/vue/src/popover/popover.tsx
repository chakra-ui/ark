import { defineComponent, type PropType } from 'vue'
import { createVueProps, type ComponentWithProps } from '../utils'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

export type PopoverProps = UsePopoverProps

const VuePopoverProps = createVueProps<Partial<PopoverProps>>({
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

export const Popover: ComponentWithProps<PopoverProps> = defineComponent({
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
    const api = usePopover(emit, props as PopoverProps)

    PopoverProvider(api)

    return () => slots.default?.(api.value)
  },
})
