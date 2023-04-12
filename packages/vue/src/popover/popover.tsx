import { computed, defineComponent, type PropType } from 'vue'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

type PopoverPropsContext = UsePopoverProps['context']

export type PopoverProps = PopoverPropsContext

const VuePopoverProps = {
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
}

export const Popover = defineComponent({
  name: 'Popover',
  props: VuePopoverProps,
  emits: [
    'open-change',
    'escape-key-down',
    'pointer-down-outside',
    'focus-outside',
    'interact-outside',
  ],
  setup(props, { slots, emit }) {
    const popoverProps = computed<UsePopoverProps>(() => ({
      context: props,
      emit,
    }))

    const api = usePopover(popoverProps.value)

    PopoverProvider(api)

    return () => slots.default?.()
  },
})
