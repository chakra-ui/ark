import { defineComponent, type PropType } from 'vue'
import { type ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogContext } from './use-dialog'

export type DialogProps = UseDialogContext

const VueDialogProps = {
  ids: {
    type: Object as PropType<DialogProps['ids']>,
  },
  trapFocus: {
    type: Boolean as PropType<DialogProps['trapFocus']>,
  },
  preventScroll: {
    type: Boolean as PropType<DialogProps['preventScroll']>,
  },
  modal: {
    type: Boolean as PropType<DialogProps['modal']>,
  },
  initialFocusEl: {
    type: Object as PropType<DialogProps['initialFocusEl']>,
  },
  finalFocusEl: {
    type: Object as PropType<DialogProps['finalFocusEl']>,
  },
  restoreFocus: {
    type: Boolean as PropType<DialogProps['restoreFocus']>,
  },
  closeOnOutsideClick: {
    type: Boolean as PropType<DialogProps['closeOnOutsideClick']>,
    default: true,
  },
  closeOnEsc: {
    type: Boolean as PropType<DialogProps['closeOnEsc']>,
  },
  'aria-label': {
    type: String as PropType<DialogProps['aria-label']>,
  },
  role: {
    type: String as PropType<DialogProps['role']>,
  },
  open: {
    type: Boolean as PropType<DialogProps['open']>,
  },
}

export const Dialog: ComponentWithProps<DialogProps> = defineComponent({
  name: 'Dialog',
  props: VueDialogProps,
  emits: ['close', 'outsideClick', 'esc', 'open', 'update:open'],
  setup(props, { slots, emit }) {
    const api = useDialog(emit, props)

    DialogProvider(api)

    return () => slots?.default?.(api.value)
  },
})
