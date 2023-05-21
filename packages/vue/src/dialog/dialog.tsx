/* eslint-disable vue/no-reserved-component-names */

import { defineComponent, type PropType } from 'vue'
import { createVueProps, type ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogProps } from './use-dialog'

export type DialogProps = UseDialogProps

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
  dir: {
    type: String as PropType<DialogProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<DialogProps['getRootNode']>,
  },
})

export const Dialog: ComponentWithProps<DialogProps> = defineComponent({
  name: 'Dialog',
  props: VueDialogProps,
  emits: ['close', 'outside-click', 'esc', 'update:open'],
  setup(props, { slots, emit }) {
    const api = useDialog(emit, props as DialogProps)

    DialogProvider(api)

    return () => slots?.default?.(api.value)
  },
})
