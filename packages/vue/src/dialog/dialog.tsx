import { computed, defineComponent, PropType } from 'vue'
import type { ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { useDialog, UseDialogProps } from './use-dialog'

type UseDialogPropsContext = UseDialogProps['context']

export type DialogProps = UseDialogPropsContext

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
    type: Element as PropType<DialogProps['initialFocusEl']>,
  },
  finalFocusEl: {
    type: Element as PropType<DialogProps['finalFocusEl']>,
  },
  restoreFocus: {
    type: Boolean as PropType<DialogProps['restoreFocus']>,
  },
  closeOnOutsideClick: {
    type: Boolean as PropType<DialogProps['closeOnOutsideClick']>,
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
  defaultOpen: {
    type: Boolean as PropType<DialogProps['defaultOpen']>,
  },
}

export const Dialog: ComponentWithProps<DialogProps> = defineComponent({
  props: VueDialogProps,
  emits: ['close', 'outsideClick', 'esc'],
  setup(props, { slots, emit }) {
    const dialogProps = computed<UseDialogProps>(() => ({
      context: props,
      emit,
    }))

    const api = useDialog(dialogProps.value)

    DialogProvider(api)

    return () => slots?.default?.()
  },
})
