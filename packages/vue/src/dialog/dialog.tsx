import { type Context as DialogContext } from '@zag-js/dialog'
import { defineComponent, type PropType } from 'vue'
import { type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { useDialog } from './use-dialog'

export type DialogProps = Assign<HTMLArkProps<any>, DialogContext>

const VueDialogProps = createVueProps<DialogProps>({
  id: {
    type: String as PropType<DialogProps['id']>,
  },
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
})

export const Dialog: ComponentWithProps<Partial<DialogProps>> = defineComponent({
  name: 'Dialog',
  props: VueDialogProps,
  emits: ['close', 'outside-click', 'esc'],
  setup(props, { slots, emit }) {
    const api = useDialog(emit, props)

    DialogProvider(api)

    return () => slots?.default?.(api.value)
  },
})
