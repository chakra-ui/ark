/* eslint-disable vue/no-reserved-component-names */

import { type Context as DialogContext } from '@zag-js/dialog'
import { defineComponent, type PropType } from 'vue'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { useDialog } from './use-dialog'

export type UseDialogProps = DialogContext

const VueDialogProps = createVueProps<UseDialogProps>({
  id: {
    type: String as PropType<UseDialogProps['id']>,
  },
  ids: {
    type: Object as PropType<UseDialogProps['ids']>,
  },
  trapFocus: {
    type: Boolean as PropType<UseDialogProps['trapFocus']>,
  },
  preventScroll: {
    type: Boolean as PropType<UseDialogProps['preventScroll']>,
  },
  modal: {
    type: Boolean as PropType<UseDialogProps['modal']>,
  },
  initialFocusEl: {
    type: Object as PropType<UseDialogProps['initialFocusEl']>,
  },
  finalFocusEl: {
    type: Object as PropType<UseDialogProps['finalFocusEl']>,
  },
  restoreFocus: {
    type: Boolean as PropType<UseDialogProps['restoreFocus']>,
  },
  closeOnOutsideClick: {
    type: Boolean as PropType<UseDialogProps['closeOnOutsideClick']>,
    default: true,
  },
  closeOnEsc: {
    type: Boolean as PropType<UseDialogProps['closeOnEsc']>,
  },
  'aria-label': {
    type: String as PropType<UseDialogProps['aria-label']>,
  },
  role: {
    type: String as PropType<UseDialogProps['role']>,
  },
  open: {
    type: Boolean as PropType<UseDialogProps['open']>,
  },
})

export const Dialog: ComponentWithProps<Partial<UseDialogProps>> = defineComponent({
  name: 'Dialog',
  props: VueDialogProps,
  emits: ['close', 'outside-click', 'esc'],
  setup(props, { slots, emit }) {
    const api = useDialog(emit, props as UseDialogProps)

    DialogProvider(api)

    return () => slots?.default?.(api.value)
  },
})

export type DialogProps = Optional<UseDialogProps, 'id'>
